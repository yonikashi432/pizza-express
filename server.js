const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');

const generateId = require('./lib/generate-id');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);

app.locals.title = 'זמירות דרדרה׳ לי׳ - Zemirot Derdareli'
app.locals.piyutim = {}; // Hymns storage
app.locals.users = {}; // Users storage
app.locals.points = {}; // User points tracking

app.get('/', (request, response) => {
  response.render('index', { piyutim: app.locals.piyutim });
});

// Create a new piyut (hymn)
app.post('/piyutim', (request, response) => {
  if (!request.body.piyut) { return response.sendStatus(400); }

  var id = generateId();
  var piyut = request.body.piyut;
  piyut.id = id;
  piyut.createdAt = new Date().toISOString();
  piyut.points = 0; // Initial points
  piyut.supporters = []; // List of users who supported this piyut

  app.locals.piyutim[id] = piyut;

  response.redirect('/piyutim/' + id);
});

// View a specific piyut (hymn)
app.get('/piyutim/:id', (request, response) => {
  var piyut = app.locals.piyutim[request.params.id];

  if (!piyut) {
    return response.status(404).send('Piyut not found');
  }

  response.render('piyut', { piyut: piyut });
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
    console.log(`🕯️ ה' אחד ושמו אחד - The Lord is One and His Name is One`);
  });
}

module.exports = app;
