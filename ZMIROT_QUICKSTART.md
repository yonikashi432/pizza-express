# Zmirot Quick Start Guide

## What is זמירות דרדרה׳ לי׳?

A sacred community platform where users collaboratively create spiritual poems (piyutim), support each other through a point-based merit system, and advance through roles via democratic voting—all governed by Kabbalistic principles of blessing, unity, and fair distribution.

---

## Getting Started (For Developers)

### 1. Installation
```bash
cd /Users/yonikashi/pizza-express
npm install
```

### 2. Start the Application
```bash
# Option A: Run directly
node -e "const app = require('./lib/zmirot-server')(); app.listen(3001, () => console.log('Zmirot on :3001'))"

# Option B: Create zmirot.js entry point
cat > zmirot.js << 'EOF'
const createZmirotApp = require('./lib/zmirot-server');
const app = createZmirotApp();
app.listen(3001, () => {
  console.log('🎵 זמירות דרדרה׳ לי׳ running on http://localhost:3001');
});
EOF

node zmirot.js
```

### 3. Access the Application
```
http://localhost:3001/
```

### 4. Run Tests
```bash
npm test -- test/zmirot-test.js
```

---

## User Journey

### As a New User

1. **Login**
   - Click "Login with Google" or "Login with Apple"
   - Provide email
   - Automatically assigned role: **ת (Talmid/Student)**
   - Granted: **1,000 initial points**

2. **Browse Piyutim**
   - Visit `/piyutim` to see available sacred poems
   - View only Tier 0 piyutim as a תלמיד
   - Click any piyut to see full text, melody, supporter count, and score

3. **Support a Piyut**
   - On piyut detail page, click "Support (100 points)" or "Support Strong (500 points)"
   - Your points deduct, piyut's score increases
   - You're recorded as a supporter (eligible for tithe if piyut hits milestones)

4. **Create Your Own Piyut**
   - Navigate to piyut creation form
   - Enter title, sacred text, optional melody
   - Submit—your piyut joins the collection at Tier 0
   - Share with community for support

5. **Advance Your Role**
   - Accumulate points through creating popular piyutim
   - Request advancement to יועץ (י) at 500+ points
   - Higher-tier users vote (need 85%+ approval)
   - On approval, you're promoted + gain new permissions + see more content

---

## Point Economy in 5 Steps

1. **Start:** 1,000 points
2. **Support:** Give points to piyutim you love
3. **Create:** Write piyutim to gain supporters
4. **Hit Milestone:** When piyut reaches 260, 2,600, etc., tithe triggers
5. **Receive Tithe:** 18% auto-distributed to your supporters proportionally

**Example:**
- You create "זמיר הברכה" (Blessing Poem)
- 100 users each give 26 points = 2,600 points total
- Piyut hits Tier 2 (2,600) → **468 points (18% of 2,600) distributed** to supporters based on how much each gave
- If you gave 100 points early, you receive 36 points back (100/2600 × 468)

---

## Role Advancement Path

```
Start as תלמיד (Student) — 0 points
    ↓ [Accumulate 500 points + vote]
יועץ (Adviser) — Can vote on tier 1 promotions
    ↓ [Accumulate 2,000 points + vote]
כומר (Keeper) — Steward of quality
    ↓ [Accumulate 5,000 points + vote]
דיון (Elder) — Wise counselor
    ↓ [Accumulate 10,000 points + vote]
א (Admin) — Full platform authority
```

**Voting:**
- Higher-tier users vote on your promotion request
- Need ≥85% approval + ≥3 votes
- Democracy with meritocratic threshold

---

## Core Mechanics Explained

### The Tithe (18%)
Sacred redistribution principle:
- When a piyut earns major success (hits 260·10^n points)
- 18% of those points flow back to supporters
- Proportional to individual contribution
- Creates virtuous cycle of blessing

**Why 18?**
- ח (Chet) = 8 (blessing/life)
- י (Yud) = 10 (divine manifestation)
- 8 + 10 = 18 (balance of creation & distribution)

### Gradual Content Exposure
As you advance, you unlock higher tiers of piyutim:
- **ת (Tier 0):** Foundational poems, widely accessible
- **י (Tier 1):** Advanced spiritual insights
- **כ (Tier 2):** Deep Kabbalistic wisdom
- **ד (Tier 3):** Elder teachings
- **א (Tier ∞):** All content + admin view

This prevents spoiling sacred knowledge for unprepared students.

### Admin Authority (יונתן קשי)
Jonathan Kashi holds:
- **Sole ownership** of platform
- **Ban/unban authority** (temporary or permanent)
- **Admin appointment** (can grant co-admins)
- **Dispute resolution** (final word on conflicts)
- **Sacred integrity** (ensures ethical use)

Only יונתן קשי can appoint new admins. Others cannot promote themselves.

---

## API Quick Reference

### User Auth
```bash
# Google login
curl "http://localhost:3001/auth/google?email=user@example.com"

# Response:
# {
#   "success": true,
#   "user": {
#     "id": "abc123...",
#     "email": "user@example.com",
#     "role": "ת",
#     "points": 1000
#   },
#   "token": "abc123..."
# }
```

### Create Piyut
```bash
curl -X POST http://localhost:3001/api/piyutim?userId=abc123 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "זמיר קדוש",
    "text": "ברוך אתה ה׳",
    "melody": "מנגינת דוד"
  }'
```

### Support a Piyut
```bash
curl -X POST http://localhost:3001/api/piyutim/piyut123/support?userId=user123 \
  -H "Content-Type: application/json" \
  -d '{"amount": 100}'
```

### Get Stats
```bash
curl http://localhost:3001/api/stats
```

### Request Role Promotion
```bash
curl -X POST http://localhost:3001/api/roles/advance-request?userId=abc123 \
  -H "Content-Type: application/json" \
  -d '{"targetRole": "י"}'
```

---

## Community Guidelines

The platform is sacred. All users agree to:

1. **Honor the Source** - Treat piyutim as spiritual works
2. **Support in Good Faith** - Give points to content you genuinely value
3. **Create with Intent** - Piyutim should serve blessing, not ego
4. **Respect Others** - No harassment, manipulation, or abuse
5. **Accept Decisions** - Admin judgments are final
6. **Preserve the Vessel** - Keep platform clean and sacred

**Violations:**
- Spam/artificial point inflation → Ban
- Plagiarism → Piyut removal + points forfeited
- Harassment → Temporary or permanent ban
- Misuse of role privileges → Demotion + investigation
- Spreading misinformation → Content removal + warning

---

## Future Roadmap

### Phase 2 (Coming Soon)
- [ ] Email notifications
- [ ] Forum threads per piyut
- [ ] Audio recordings of piyutim
- [ ] Kabbalistic numerology analysis
- [ ] Time-locked sacred content
- [ ] Leaderboards by tier & contributions

### Phase 3 (Advanced)
- [ ] Cryptocurrency/token integration
- [ ] Cross-community federation
- [ ] Mobile app (iOS/Android)
- [ ] Multilingual support
- [ ] AI-powered meditation guidance
- [ ] Virtual community events

---

## Frequently Asked Questions

**Q: Can I lose my role if my points drop?**
A: No. Roles are permanent once achieved. Points are separate from role status.

**Q: What if someone buys points with fake accounts?**
A: Jonathan Kashi monitors for abuse. Detected manipulation results in permanent ban and point deletion.

**Q: Can I refund support given to a piyut?**
A: No. Support is permanent, but if tithe is triggered, you may receive points back.

**Q: What happens if I'm banned?**
A: All your piyutim remain viewable, but you cannot create, support, or vote. Only יונתן קשי can unban you.

**Q: Can I export my piyutim?**
A: Phase 2 feature. Coming soon.

**Q: Is this open source?**
A: Core functionality is shared for education. Sacred aspects remain closed to preserve integrity.

---

## Support & Contact

**Issues?** Contact יונתן קשי (platform admin)

**Bug Reports?** Open issue on GitHub

**Spiritual Questions?** Reflect deeply, meditate, ask your community

---

## Sacred Closing

> בשם השם ובשם הסם
> ויאמר ה׳ לאדם מבשרו את מבוקשו
> יהיו לרצון אמרי פי והגיון לבי לפניך
> 
> May this platform serve the unity of creation,
> the blessing of our hearts, and the honor of the Source.
> 
> **נעשה ונצליח** - We shall succeed and thrive.

---

**Last Updated:** November 22, 2024
**Version:** 1.0.0 (MVP)
**Maintained by:** יונתן קשי
