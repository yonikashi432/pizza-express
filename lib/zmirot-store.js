const generateId = require('./generate-id');

class ZmirotStore {
  constructor() {
    this.users = {};
    this.piyutim = {};
    this.supports = [];
    this.roleVotes = [];
    this.adminId = 'jonathan-kashi'; // יונתן קשי
  }

  // User management
  createUser(email, provider) {
    const id = generateId();
    const user = {
      id,
      email,
      provider,
      role: 'ת', // תלמיד (student) - initial role
      points: 1000,
      createdAt: new Date(),
      supportersGiven: [],
      piyutimCreated: [],
      levelVotes: [],
      banned: false
    };
    this.users[id] = user;
    return user;
  }

  getUser(userId) {
    return this.users[userId];
  }

  getUserByEmail(email) {
    return Object.values(this.users).find(u => u.email === email);
  }

  // Piyut management
  createPiyut(authorId, title, text, melody = '') {
    const id = generateId();
    const piyut = {
      id,
      title,
      text,
      melody,
      authorId,
      score: 0,
      supporters: [], // [{userId, amount}]
      createdAt: new Date(),
      tier: 0, // 0 = no tier, 1 = 260, 2 = 2600, etc.
      tierMilestoneHit: [] // dates when tiers were hit
    };
    this.piyutim[id] = piyut;
    
    const author = this.users[authorId];
    if (author) {
      author.piyutimCreated.push(id);
    }
    
    return piyut;
  }

  getPiyut(piyutId) {
    return this.piyutim[piyutId];
  }

  getAllPiyutim() {
    return Object.values(this.piyutim);
  }

  // Support/voting system
  supportPiyut(supporterId, piyutId, amount) {
    const supporter = this.users[supporterId];
    const piyut = this.piyutim[piyutId];

    if (!supporter || !piyut) return null;
    if (supporter.points < amount) return null;

    // Deduct from supporter
    supporter.points -= amount;
    supporter.supportersGiven.push({ piyutId, amount, date: new Date() });

    // Add to piyut
    const existingSupport = piyut.supporters.find(s => s.userId === supporterId);
    if (existingSupport) {
      existingSupport.amount += amount;
    } else {
      piyut.supporters.push({ userId: supporterId, amount });
    }

    piyut.score += amount;

    // Check for tiered milestones
    this.checkTierMilestones(piyutId);

    return { supporter, piyut };
  }

  // Tier milestones: 260, 2600, 26000, etc.
  checkTierMilestones(piyutId) {
    const piyut = this.piyutim[piyutId];
    let newTier = 0;

    const milestones = [260, 2600, 26000, 260000, 2600000];
    for (let i = 0; i < milestones.length; i++) {
      if (piyut.score >= milestones[i]) {
        newTier = i + 1;
      } else {
        break;
      }
    }

    if (newTier > piyut.tier) {
      piyut.tier = newTier;
      piyut.tierMilestoneHit.push({ tier: newTier, date: new Date() });
      
      // Distribute tithe (18%) to supporters proportionally
      this.distributeTithe(piyutId, milestones[newTier - 1]);
    }
  }

  distributeTithe(piyutId, milestoneAmount) {
    const piyut = this.piyutim[piyutId];
    const tithe = Math.floor(milestoneAmount * 0.18); // 18%
    const totalSupport = piyut.supporters.reduce((sum, s) => sum + s.amount, 0);

    if (totalSupport === 0) return;

    // Distribute tithe proportionally
    piyut.supporters.forEach(support => {
      const proportion = support.amount / totalSupport;
      const tithePortion = Math.floor(tithe * proportion);
      const user = this.users[support.userId];
      if (user) {
        user.points += tithePortion;
      }
    });
  }

  // Role advancement system
  initiateLevelVote(candidateId, targetRole) {
    // Check if candidate has enough points
    const candidate = this.users[candidateId];
    if (!candidate) return null;

    // Point thresholds for advancement
    const roleThresholds = {
      'ת': 0,       // תלמיד (student)
      'י': 500,     // יועץ (adviser)
      'כ': 2000,    // כומר (keeper)
      'ד': 5000,    // דיון (elder)
      'א': 10000    // אדמין (admin)
    };

    if (candidate.points < roleThresholds[targetRole]) {
      return null;
    }

    const voteId = generateId();
    const vote = {
      id: voteId,
      candidateId,
      targetRole,
      initiatedAt: new Date(),
      votes: [], // [{voterId, vote: true/false}]
      status: 'pending' // pending, approved, rejected
    };

    this.roleVotes.push(vote);
    return vote;
  }

  castLevelVote(voteId, voterId, approval) {
    const vote = this.roleVotes.find(v => v.id === voteId);
    if (!vote) return null;

    const voter = this.users[voterId];
    const candidate = this.users[vote.candidateId];

    if (!voter || !candidate) return null;

    // Only users at a higher level can vote
    const roleOrder = ['ת', 'י', 'כ', 'ד', 'א'];
    if (roleOrder.indexOf(voter.role) <= roleOrder.indexOf(candidate.role)) {
      return null;
    }

    // Check if voter already voted
    const existingVote = vote.votes.find(v => v.voterId === voterId);
    if (existingVote) {
      existingVote.vote = approval;
    } else {
      vote.votes.push({ voterId, vote: approval });
    }

    this.evaluateVote(voteId);
    return vote;
  }

  evaluateVote(voteId) {
    const vote = this.roleVotes.find(v => v.id === voteId);
    if (!vote || vote.status !== 'pending') return;

    const totalVotes = vote.votes.length;
    const approvalVotes = vote.votes.filter(v => v.vote === true).length;
    const approvalRate = totalVotes > 0 ? (approvalVotes / totalVotes) * 100 : 0;

    // Need 85% approval
    if (approvalRate >= 85 && totalVotes >= 3) {
      vote.status = 'approved';
      const candidate = this.users[vote.candidateId];
      candidate.role = vote.targetRole;
    } else if (approvalRate < 50 && totalVotes >= 3) {
      vote.status = 'rejected';
    }
  }

  // Admin functions
  banUser(adminId, userId, duration = null) {
    const admin = this.users[adminId];
    if ((admin && admin.role !== 'א') && adminId !== this.adminId) {
      return null;
    }

    const user = this.users[userId];
    if (!user) return null;

    user.banned = true;
    user.bannedAt = new Date();
    user.bannedDuration = duration; // in days, null = permanent

    return user;
  }

  unbanUser(adminId, userId) {
    const admin = this.users[adminId];
    if ((admin && admin.role !== 'א') && adminId !== this.adminId) {
      return null;
    }

    const user = this.users[userId];
    if (!user) return null;

    user.banned = false;
    user.bannedAt = null;
    user.bannedDuration = null;

    return user;
  }

  // Audit & analytics
  getStats() {
    return {
      totalUsers: Object.keys(this.users).length,
      totalPiyutim: Object.keys(this.piyutim).length,
      totalSupports: this.supports.length,
      usersByRole: Object.values(this.users).reduce((acc, u) => {
        acc[u.role] = (acc[u.role] || 0) + 1;
        return acc;
      }, {}),
      topPiyutim: Object.values(this.piyutim)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10),
      pendingVotes: this.roleVotes.filter(v => v.status === 'pending').length
    };
  }
}

module.exports = ZmirotStore;
