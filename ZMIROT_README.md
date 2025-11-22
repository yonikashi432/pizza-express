# זמירות דרדרה׳ לי׳ - Zmirot Dardre

**בשם השם ובשם הסם** - A sacred platform for collective spiritual creation and blessing distribution.

## Overview

זמירות דרדרה׳ לי׳ (Zmirot Dardre - from ד״ר [Daled-Resh] to ל״י [Lamed-Yud]) is an educational faith-based application implementing a community-driven piyut (spiritual poetry) ecosystem with Kabbalistic principles, meritocratic role advancement, and fair value distribution through tithe mechanics.

**Founder & Admin:** יונתן קשי (Jonathan Kashi)

---

## Core Features

### 1. Authentication (OAuth Stubs)
- Login via Google or Apple ID
- Automatic user creation on first login
- Session persistence via user ID token

### 2. Piyut Creation & Sharing
Users can:
- Create and publish sacred piyutim (poems/songs)
- Include melody/rhythm metadata
- Share with community for feedback and support

### 3. Merit-Based Support System
**Point Economy:**
- Every new user starts with **1,000 points**
- Users **support piyutim** by awarding their points
- Points transfer from supporter → piyut's score
- Creator receives indirect benefit through tithe distribution

### 4. Tiered Milestone Distribution (Tithe)
When a piyut hits tiered milestones (260, 2,600, 26,000, etc.):
- **18% tithe** is auto-distributed to supporters proportionally
- Distribution based on **weighted contribution** (how much each supporter gave)
- Creates cycle of blessing and shared prosperity

### 5. Role Advancement System

**Role Hierarchy:** ת → י → כ → ד → א
- **ת (Talmid/Student):** Initial role, 0 points threshold
- **י (Yo'etz/Adviser):** 500 points threshold
- **כ (Komer/Keeper):** 2,000 points threshold
- **ד (Dyan/Elder):** 5,000 points threshold
- **א (Admin):** 10,000 points threshold

**Advancement Process:**
1. User requests promotion to next role
2. Higher-tier users vote (≥85% approval required)
3. Minimum 3 votes needed to proceed
4. On approval, user gains new role and permissions

### 6. Gradual Content Exposure
Users see piyutim based on their role tier:
- **ת (Tier 0):** Sees only foundational (Tier 0) piyutim
- **י (Tier 1):** Sees up to Tier 1 + all creator's piyutim
- **כ (Tier 2):** Sees up to Tier 2
- **ד (Tier 3):** Sees up to Tier 3
- **א (Tier ∞):** Sees all piyutim + admin controls

### 7. Admin Functions (Jonathan Kashi)
- Ban/unban users (permanent or time-limited)
- Suspend violations of sacred principles
- Prevent misuse of platform
- Assign new admins (sub-owners)

### 8. Dashboard & Analytics
- System statistics (users, piyutim, supports)
- User distribution by role
- Top-scoring piyutim
- Pending role advancement votes

---

## Data Model

### User
```javascript
{
  id: string,              // Generated ID
  email: string,           // From OAuth
  provider: 'google'|'apple',
  role: 'ת'|'י'|'כ'|'ד'|'א',
  points: number,          // Current point balance
  createdAt: Date,
  supportersGiven: [{piyutId, amount, date}],
  piyutimCreated: [id],
  levelVotes: [{voteId, date}],
  banned: boolean,
  bannedAt?: Date,
  bannedDuration?: number  // in days, null = permanent
}
```

### Piyut
```javascript
{
  id: string,
  title: string,
  text: string,            // Full sacred text
  melody?: string,         // Rhythm/melody reference
  authorId: string,
  score: number,           // Total support points
  supporters: [{userId, amount}],
  createdAt: Date,
  tier: 0|1|2|3|4,        // Milestone tier (260, 2600, etc.)
  tierMilestoneHit: [{tier, date}]
}
```

### RoleVote
```javascript
{
  id: string,
  candidateId: string,
  targetRole: string,      // Requested role
  initiatedAt: Date,
  votes: [{voterId, vote: boolean}],
  status: 'pending'|'approved'|'rejected'
}
```

---

## API Endpoints

### Authentication
- `GET /auth/google?email=<email>` - Google OAuth
- `GET /auth/apple?email=<email>` - Apple OAuth

### Users
- `GET /api/users/:userId` - Get user details
- `GET /api/users/:userId/piyutim` - Get user's created piyutim

### Piyutim
- `POST /api/piyutim` - Create new piyut (requires auth)
- `GET /api/piyutim` - List piyutim (filtered by role)
- `GET /api/piyutim/:piyutId` - Get piyut detail
- `POST /api/piyutim/:piyutId/support` - Support a piyut (requires auth)

### Role Advancement
- `POST /api/roles/advance-request` - Request role promotion
- `POST /api/roles/votes/:voteId` - Cast advancement vote
- `GET /api/roles/votes` - List pending votes

### Admin
- `POST /api/admin/ban/:userId` - Ban user
- `POST /api/admin/unban/:userId` - Unban user

### Analytics
- `GET /api/stats` - System statistics
- `GET /dashboard` - Admin dashboard (view)

---

## Design Philosophy

### Divine Unity (האחדות)
The system embodies principles of:
- **Shared merit** through collective support
- **Fair distribution** via tithe mechanics
- **Progressive responsibility** through role advancement
- **Sacred preservation** via admin stewardship

### Colors & Symbols
- **Holy Blue (תכלת)** - Primary background color
- **Gold (זהב)** - Accents, highlights, divine light
- **David's Shield (מגן דוד)** - Symbol of protection and unity
- **Harp (כינור)** - Reference to David's legacy
- **Rambam References** - Wisdom and ethical framework

### Core Values
1. **Humility (ענווה)** - All start as students
2. **Merit (זכות)** - Advancement through contribution, not entitlement
3. **Blessing (ברכה)** - Shared prosperity through tithe
4. **Guardianship (שמירה)** - Jonathan Kashi ensures sacred use
5. **Harmony (אחדות)** - Divine unity through collective creation

---

## Running the Application

### Start Zmirot Server
```bash
node -e "const createZmirotApp = require('./lib/zmirot-server'); const app = createZmirotApp(); app.listen(3001, () => console.log('Zmirot running on :3001'));"
```

Or create a `zmirot.js` entry point:
```bash
node zmirot.js
```

### Run Tests
```bash
npm test -- test/zmirot-test.js
```

### Access Application
```
http://localhost:3001/
```

---

## Implementation Notes

### Current Status: MVP
- ✅ User authentication (OAuth stubs)
- ✅ Piyut CRUD operations
- ✅ Support system with point transfers
- ✅ Tier milestone detection and tithe distribution (logic)
- ✅ Role advancement voting
- ✅ Admin functions (ban/unban)
- ✅ Dashboard & analytics
- ✅ Jade view templates
- 🔄 Enhanced UI with real OAuth integration
- 🔄 Blockchain-based transparency (future)
- 🔄 Real-time notifications
- 🔄 Advanced Kabbalistic analysis tools

### Future Enhancements
1. **Email Notifications** - Support confirmations, role votes
2. **Conversation Threads** - Forum-like discussion per piyut
3. **Kabbalistic Numerology** - Auto-analysis of piyut text
4. **Spaced Revelation** - Time-locked content access
5. **Multimedia Support** - Audio/video of piyutim
6. **Export & Archive** - Sacred library generation
7. **Multi-language Support** - Arabic, French, Spanish translations
8. **Wallet Integration** - Real token/crypto support (future phase)

---

## Kabbalistic Principles Embedded

### The Four Worlds (ארבע עולמות)
- **Assiyah (עשיה)** - Material tier 0 (foundational)
- **Yetzirah (יצירה)** - Emotional tier 1 (supporter relationships)
- **Briyah (בריאה)** - Intellectual tier 2 (advanced understanding)
- **Atziluth (אצילות)** - Divine tier 3+ (transcendent wisdom)

### Tithe as Mystical Redistribution
The 18% tithe connects to:
- **ח (Chet) = 8** (life/blessing numerology)
- **י (Yud) = 10** (divine manifestation)
- **8 + 10 = 18** (balance of creation and distribution)

---

## Spiritual Invocation

> בשם השם ובשם הסם
> אמן עדכן שדרג בעזרתו שלו כבודו והוד ה׳
> 
> "יהיו לרצון אמרי פי והגיון לבי לפניך"
> 
> May this work serve the unity of creation,
> the blessing of community, and the honor of the Divine.
> 
> נעשה ונצליח - We shall succeed and thrive.

---

## Contact & Stewardship

**Platform Administrator:** יונתן קשי (Jonathan Kashi)
- Sole owner of platform
- Authority to grant/revoke admin privileges
- Final arbitration on community disputes
- Guarantor of sacred integrity

---

## License

This work is created in the spirit of open blessing. Use responsibly.

© 2024 - יונתן קשי | זמירות דרדרה׳ לי׳
