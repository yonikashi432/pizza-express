const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ZmirotStore = require('./zmirot-store');

function createZmirotApp() {
  const app = express();
  const store = new ZmirotStore();

  // Middleware
  app.use(express.static('static'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set('view engine', 'jade');
  app.set('port', process.env.ZMIROT_PORT || 3001);

  app.locals.title = 'זמירות דרדרה׳ לי׳ (Zmirot Dardre)';
  app.locals.store = store;
  app.locals.adminId = 'jonathan-kashi';

  // Middleware: Session/Auth simulation (replace with real OAuth)
  app.use((req, res, next) => {
    req.userId = req.query.userId || req.headers['x-user-id'];
    req.user = req.userId ? store.getUser(req.userId) : null;
    next();
  });

  // Routes

  // Auth stub
  app.get('/auth/google', (req, res) => {
    const email = req.query.email;
    let user = store.getUserByEmail(email);
    if (!user) {
      user = store.createUser(email, 'google');
    }
    res.json({ success: true, user, token: user.id });
  });

  app.get('/auth/apple', (req, res) => {
    const email = req.query.email;
    let user = store.getUserByEmail(email);
    if (!user) {
      user = store.createUser(email, 'apple');
    }
    res.json({ success: true, user, token: user.id });
  });

  // User endpoints
  app.get('/api/users/:userId', (req, res) => {
    const user = store.getUser(req.params.userId);
    if (!user) return res.sendStatus(404);
    res.json(user);
  });

  app.get('/api/users/:userId/piyutim', (req, res) => {
    const user = store.getUser(req.params.userId);
    if (!user) return res.sendStatus(404);
    
    const userPiyutim = user.piyutimCreated.map(id => store.getPiyut(id));
    res.json(userPiyutim);
  });

  // Piyut CRUD
  app.post('/api/piyutim', (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!req.body.title || !req.body.text) return res.sendStatus(400);

    const piyut = store.createPiyut(
      req.user.id,
      req.body.title,
      req.body.text,
      req.body.melody || ''
    );
    res.status(201).json(piyut);
  });

  app.get('/api/piyutim', (req, res) => {
    const all = store.getAllPiyutim();
    
    // Filter based on user role if authenticated
    let filtered = all;
    if (req.user) {
      // Simple gradual exposure: higher roles see all; lower see based on tier
      const roleExposure = {
        'ת': 0,  // תלמיד - sees tier 0 only
        'י': 1,  // יועץ - sees up to tier 1
        'כ': 2,  // כומר - sees up to tier 2
        'ד': 3,  // דיון - sees up to tier 3
        'א': 99  // אדמין - sees all
      };
      
      const maxTier = roleExposure[req.user.role] || 0;
      filtered = all.filter(p => p.tier <= maxTier || p.authorId === req.user.id);
    } else {
      filtered = all.filter(p => p.tier === 0); // Unauthenticated see only tier 0
    }

    res.json(filtered);
  });

  app.get('/api/piyutim/:piyutId', (req, res) => {
    const piyut = store.getPiyut(req.params.piyutId);
    if (!piyut) return res.sendStatus(404);
    res.json(piyut);
  });

  // Support system
  app.post('/api/piyutim/:piyutId/support', (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!req.body.amount || req.body.amount < 1) return res.sendStatus(400);

    const result = store.supportPiyut(req.user.id, req.params.piyutId, req.body.amount);
    if (!result) return res.sendStatus(400);

    res.json(result);
  });

  // Role advancement
  app.post('/api/roles/advance-request', (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!req.body.targetRole) return res.sendStatus(400);

    const vote = store.initiateLevelVote(req.user.id, req.body.targetRole);
    if (!vote) return res.sendStatus(400);

    res.status(201).json(vote);
  });

  app.post('/api/roles/votes/:voteId', (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (typeof req.body.approval !== 'boolean') return res.sendStatus(400);

    const vote = store.castLevelVote(req.params.voteId, req.user.id, req.body.approval);
    if (!vote) return res.sendStatus(400);

    res.json(vote);
  });

  app.get('/api/roles/votes', (req, res) => {
    const votes = app.locals.store.roleVotes;
    res.json(votes);
  });

  // Admin: ban/unban
  app.post('/api/admin/ban/:userId', (req, res) => {
    const admin = req.user && (req.user.role === 'א' || req.user.id === app.locals.adminId);
    if (!admin) {
      return res.sendStatus(403);
    }

    const duration = req.body.duration || null; // days
    const result = store.banUser(req.user.id, req.params.userId, duration);
    if (!result) return res.sendStatus(400);

    res.json(result);
  });

  app.post('/api/admin/unban/:userId', (req, res) => {
    const admin = req.user && (req.user.role === 'א' || req.user.id === app.locals.adminId);
    if (!admin) {
      return res.sendStatus(403);
    }

    const result = store.unbanUser(req.user.id, req.params.userId);
    if (!result) return res.sendStatus(400);

    res.json(result);
  });

  // Dashboard & stats
  app.get('/api/stats', (req, res) => {
    const stats = store.getStats();
    res.json(stats);
  });

  // View routes (for web UI)
  app.get('/', (req, res) => {
    res.render('zmirot/index', {
      title: app.locals.title,
      user: req.user
    });
  });

  app.get('/piyutim', (req, res) => {
    const piyutim = app.locals.store.getAllPiyutim();
    res.render('zmirot/piyutim-list', {
      title: app.locals.title,
      user: req.user,
      piyutim
    });
  });

  app.get('/piyutim/:piyutId', (req, res) => {
    const piyut = store.getPiyut(req.params.piyutId);
    if (!piyut) return res.sendStatus(404);

    res.render('zmirot/piyut-detail', {
      title: app.locals.title,
      user: req.user,
      piyut
    });
  });

  app.get('/dashboard', (req, res) => {
    if (!req.user) return res.redirect('/');

    const stats = store.getStats();
    res.render('zmirot/dashboard', {
      title: app.locals.title,
      user: req.user,
      stats
    });
  });

  return app;
}

module.exports = createZmirotApp;
