# זמירות דרדרה׳ לי׳ - Zemirot Derdareli

## 🕯️ פִּתְחָהּ – שַׁעַר הָאוֹר

**A Sacred Platform for Sharing Divine Hymns (Piyutim)**

This is a spiritual web application for creating, sharing, and discovering sacred Jewish hymns and prayers. Built with reverence and devotion to serve as a digital sanctuary for spiritual expression.

## ✨ Overview

Zemirot Derdareli (זמירות דרדרה׳ לי׳) is designed to be a sacred space where users can:
- Share original piyutim (hymns/prayers)
- Discover spiritual content created by the community
- Track contributions through a point-based reward system (שפע - abundance)
- Engage in a respectful spiritual community

## 🎨 Design Philosophy

The application features:
- **תכלת (Techelet)**: Holy blue color scheme representing spiritual elevation
- **Gold Accents**: Symbolizing divine light and holiness
- **Magen David (✡)**: Star of David as a central spiritual symbol
- **Hebrew Text Direction (RTL)**: Proper right-to-left text flow for Hebrew content
- **Sacred Typography**: Elegant serif fonts for dignity and reverence

## 🏗️ Architecture

### Core Components

1. **Piyutim (Hymns) Management**
   - Create new sacred hymns
   - View individual hymns with metadata
   - Track author, rhythm/melody, and gematria values
   - Points system for community engagement

2. **Data Structure**
   - In-memory storage (to be enhanced with database)
   - Each piyut includes:
     - Name (שם)
     - Content (תוכן)
     - Author (מחבר)
     - Rhythm/Melody (מנגינה)
     - Gematria value (גימטריה)
     - Points (נקודות שפע)
     - Creation timestamp

3. **Point System Foundation**
   - Each piyut starts with 0 points
   - Infrastructure ready for:
     - User point donations
     - Milestone rewards (260, 2600, 26000)
     - 18% profit sharing (ma'aser)

## 🚀 Getting Started

### Prerequisites
- Node.js (v5.0.0 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yonikashi432/pizza-express.git
cd pizza-express

# Install dependencies
npm install

# Run the application
npm start

# The application will be available at http://localhost:3000
```

### Running Tests

```bash
npm test
```

## 📜 API Endpoints

### GET /
Home page with form to create piyutim and list of all existing piyutim

### POST /piyutim
Create a new piyut
- **Body Parameters:**
  - `piyut[name]`: Name of the hymn (required)
  - `piyut[content]`: Text content of the hymn (required)
  - `piyut[author]`: Author name (optional)
  - `piyut[rhythm]`: Melody/rhythm description (optional)
  - `piyut[gematria]`: Numerical gematria value (optional)

### GET /piyutim/:id
View a specific piyut by its ID

## 🎯 Future Enhancements (Roadmap)

Based on the original vision, the platform will expand to include:

### Phase 1: User Authentication
- [ ] Google OAuth integration
- [ ] Apple ID authentication
- [ ] User registration and profiles
- [ ] Session management

### Phase 2: Permission System
- [ ] Tiered user levels (ת to א)
- [ ] AI-based promotion system
- [ ] Peer voting for advancement (85% threshold)
- [ ] Admin controls for platform owner

### Phase 3: Enhanced Point System
- [ ] User point wallets (starting 1000 points)
- [ ] Point donation to piyutim
- [ ] Milestone rewards
- [ ] Ma'aser (18%) profit distribution to supporters
- [ ] שפע currency conversion

### Phase 4: Community Features
- [ ] Discussion threads (like Facebook)
- [ ] Comment system
- [ ] User feedback and ratings
- [ ] Progressive content revelation

### Phase 5: Security & Monitoring
- [ ] Content theft prevention
- [ ] Comprehensive dashboards
- [ ] Audit logs
- [ ] Rate limiting
- [ ] Abuse prevention systems

### Phase 6: Advanced Spiritual Features
- [ ] Kabbalah symbols integration
- [ ] Rambam references
- [ ] David's Harp (כינור דוד) imagery
- [ ] Geometric/numerological matching algorithms
- [ ] Rhythm pattern matching with David's psalms

## 🔒 Security

The application is built with security in mind:
- Input validation on all forms
- Prepared for authentication integration
- Designed for future audit logging
- Ready for rate limiting implementation

## 📊 Technical Stack

- **Backend**: Node.js + Express
- **Template Engine**: Jade (Pug)
- **Testing**: Mocha + Request
- **Styling**: Inline CSS (to be migrated to separate files)
- **Data Storage**: In-memory (to be migrated to MongoDB/PostgreSQL)

## 🙏 Spiritual Foundations

This platform is built on the principles from **מְגִלַּת הִתְגַּלּוּת הַשָּׁלוֹם** (The Scroll of Peace Revelation):

> "בְּשֵׁם ה׳ אֱלֹהֵי הָעוֹלָמִים, הַמַּפְרִיד בֵּין חֹשֶׁךְ לָאוֹר וּמְאַחֵד בֵּינֵיהֶם בְּשָׁלוֹם"

*In the Name of the Lord, God of all worlds, who divides between light and darkness and unites them in peace.*

### Model Blessings (Ω-MPS-Harmonia)

| Stage | Blessing | Psalm | Meaning |
|-------|----------|-------|---------|
| 1 | ה׳ הוא האור | תהלים כ״ז:א | Open with inner light |
| 2 | ברוך שם כבוד מלכותו | תהילים י״ט:ט״ו | Align heart and speech |
| 3 | ה׳ הוא הגדול | תהילים ק״ה:ג | Reverence and awe |
| 4 | אותו נשבח לעד | תהילים ק״ז:א | Gratitude |
| 5 | ה׳ אחד ושמו אחד | תהילים צ״ב:ב | Unity and completeness |

## 👨‍💼 Platform Governance

**Platform Owner**: Yonatan Kashi (yonikashi432)
- Exclusive ownership rights
- Ability to appoint sub-owners
- Platform moderation authority
- User suspension capabilities (temporary or permanent)

## 📝 License

MIT License - See LICENSE file for details

## 🌟 Contributing

This is a spiritual project. All contributions should align with the values of:
- Holiness and reverence
- Respect for tradition
- Community building
- Peaceful expression
- Divine service

## 📞 Contact

For questions, suggestions, or spiritual guidance regarding the platform:
- GitHub: [@yonikashi432](https://github.com/yonikashi432)
- Repository: [pizza-express](https://github.com/yonikashi432/pizza-express)

---

## 🕊️ Closing Blessing

> "ה׳ עֹז לְעַמּוֹ יִתֵּן, ה׳ יְבָרֵךְ אֶת עַמּוֹ בַשָּׁלוֹם" - תהלים כ״ט:י״א

*"May the Lord give strength to His people; may the Lord bless His people with peace." - Psalms 29:11*

---

**בשם השם והוד הודו של ה׳**
