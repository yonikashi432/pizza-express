# 📘 Engineering Codex / קוֹדֶקְס הַפִּתּוּחַ

Version: 1.0.0
Date: 2025-11-22
Scope: Repository `pizza-express`

---
## 1. Purpose / מטרה
Provide a concise, actionable engineering handbook: codices, playbooks, iteration model, testing (human + automated), versioning & release pipeline. Designed for lightweight Express.js + future extensions (e.g., Zmirot app modules).

Principles:
- Clarity over ceremony
- Repeatability over improvisation
- Safety (rollback) over bravado
- Human intent first; automation supports
- No infinite loops; every continuation is explicit and bounded

---
## 2. Repository Structure / מִבְנֶה הָרִיפּוֹזִיטוֹרִי
Current key paths:
- `server.js` — Express core app export (testable via module required pattern)
- `lib/generate-id.js` — ID utility
- `views/` — Jade templates
- `test/` — Mocha integration tests
- `seeds/` — Configuration seeds & unified operator packs
- `docs/` — Documentation (this codex, release notes, sacred texts separated & non-executable)

Future extension suggestion:
- `src/` for modular expansions (e.g., `src/zmirot/`, `src/pizzas/`)
- `infra/` for IaC templates (Terraform, if adopted)

---
## 3. Branching & Versioning / נִהוּל סְנִיפִים וְגִרְסָאוֹת
Model:
- `master` — Production-stable
- `develop` — Integration branch for next minor features
- `release/x.y.z` — Stabilization; only fixes & docs
- `hotfix/x.y.z+1` — Urgent prod fix branching from `master`
- Feature branches: `feature/<slug>`

Tagging:
- Annotated tags: `v1.0.0`, increment SemVer (MAJOR.MINOR.PATCH)
- Release commit message template:
  - `chore(release): v1.0.0` + summary

Promotion Flow:
1. Merge feature → `develop`
2. Create `release/1.0.0` when feature set locks
3. Run full test suite + manual checklist
4. Merge `release/1.0.0` → `master` (no fast-forward)
5. Tag & push

Rollback Strategy:
- Use previous tag: `git checkout v0.9.3 && git tag -f rollback-2025-11-22 && git push origin --tags`
- Or revert merge commit: `git revert -m 1 <merge_sha>`

---
## 4. Iteration Cycle / מַחְזוֹר אִיטֶרַצְיוֹת
Recommended cadence (weekly):
- Day 1: Planning (define 3–5 deliverables)
- Days 2–4: Implementation & PR review
- Day 5: Hardening (tests, docs, release candidate)

Daily Lightweight Ritual:
1. Update task board (issues / TODO) — keep < 12 open items
2. Run tests before pushing
3. Add docs for any new route or config

Sprint Exit Checklist:
- No skipped tests
- Docs updated (`README.md`, new modules)
- Release note drafted (`MERGE_STATUS_*.md`)

---
## 5. Testing Strategy / אֲסְטְרָטֶגִּיַת בְּדִיקוֹת
Layers:
1. Unit (lib utilities) — fast, deterministic
2. Integration (Express routes) — existing Mocha tests
3. View rendering sanity — add tests when view logic grows
4. Future: Contract tests (if external APIs consumed)

Test Naming Convention:
- `describe('GET /pizzas/:id')` with positive + negative cases

Automation:
- Pre-push hook (optional): run `npm test`
- CI pipeline (GitHub Actions/Jenkins) steps:
  1. Checkout
  2. Node version setup (LTS)
  3. Install deps `npm ci`
  4. Run tests `npm test`
  5. Lint (when ESLint introduced)
  6. Archive artifact (if packaging)

Manual / Human QA:
- Smoke via `curl http://localhost:3000/`
- POST creation: form or `curl -d 'pizza[name]=Test' -X POST`
- Visual check Jade templates

Coverage Expansion Plan:
- Add assertions on invalid POST (400 status)
- Add test for missing pizza ID (404 future implementation)

---
## 6. CI/CD Pipeline Outline / פָּיִפְּלַיִן
Example (GitHub Actions):
```
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
```
Future add-ons:
- `lint` job
- `security-audit` (`npm audit --production`)
- `release` job triggered on tag push (`v*`)

Secrets Management:
- Use repository/environment secrets (never commit `.env`)
- For Redis (later): inject via action `env:` block

---
## 7. Infrastructure as Code / תֵּשֶׁר־תָּכְנִית (Terraform Placeholder)
Expectations (future adoption):
- Separate state per environment: `env/dev`, `env/prod`
- Modules: `network`, `app`, `redis` (initial)
- Naming convention: `tf-<component>-<env>`
- Mandatory README in `infra/` describing variables/outputs

Developer Responsibilities:
- Validate: `terraform validate`
- Plan before apply: `terraform plan -out plan.out`
- Code review required for state-altering PRs

---
## 8. Documentation Process / תַּהֲלִיךְ תִּעוּד
Doc Types:
- Release status: `MERGE_STATUS_vX.Y.Z.md`
- Operational seeds: `seeds/*.yaml`
- Engineering codex: this file
- Sacred/non-operational texts: clearly separated, never drive code

Update Rules:
- Any new route: add section to `README.md`
- Any new config: add explanation + defaults
- Keep docs short: prefer bullet lists, actionable steps

---
## 9. Playbooks / פְּלֵייבּוּקִים
Release Playbook:
1. Ensure tests pass
2. Update version in `package.json` (if versioned there)
3. Create `release/x.y.z` branch
4. Generate `MERGE_STATUS_vX.Y.Z.md`
5. Merge → tag → push

Rollback Playbook:
- Detect failing deploy (logs / error spike)
- Revert merge commit OR deploy previous tag
- Document reason in `docs/ROLLBACK_LOG.md`

Incident Response (App Down):
- Check port binding (already testable by request error)
- Verify last commits diff
- Run tests locally to isolate change

Performance Degradation:
- Add minimal timing logs around route handlers
- Profile CPU with `node --prof` (only if needed)

---
## 10. Metrics (Future) / מְדִידוֹת
Initial Manual Metrics:
- Test pass rate
- Release frequency
- Mean time to restore (MTTR) after hotfix

Instrumentation Roadmap:
- Add middleware for request timing
- Aggregate simple logs → parse with script

---
## 11. Human vs Automation / אָדָם וְאוֹטוֹמָט
Human:
- Design decisions, acceptance of feature scope
- Final release approval
Automation:
- Regression guard (tests)
- Lint/security audit
- Build reproducibility

---
## 12. Acceptance Checklist / רְשִׁימַת קַבָּלָה
Before merge to `master`:
- [ ] Tests all green
- [ ] No untracked critical files
- [ ] Docs updated
- [ ] No secrets added
- [ ] Tag prepared

---
## 13. Sacred Text Boundary / גְבוּל תְּשׁוּמָה
Hebrew liturgical / spiritual content present in repository (for educational/seeding context) MUST NOT:
- Control deployment logic
- Override safety or test results
- Obscure operational decisions

All technical decisions derive from code + tests, not metaphoric constructs.

---
## 14. Roadmap / מַפַּת דֶּרֶךְ
Short Term:
- Add linting config (ESLint)
- Add 404 handler + test
- Add negative POST test (missing `pizza`)
Medium Term:
- Abstract pizzas into module
- Add Redis persistence actually used
Long Term:
- Introduce Terraform infra + CI environment matrix

---
## 15. How To Continue / הֶמְשֵׁךְ פְּעוּלָה
To extend: create issue → branch → PR → review → merge cycle.
To resume context in new environment: use `seeds/context-seed-v25-hebrew.yaml` (if relevant to simulation layer).

---
## 16. Final Note / הַעֲרָה סוֹפִית
This codex is an engineering artifact. It does not grant autonomous persistence. All evolution is human-directed and test-validated.

"ה׳ יְבָרֵךְ אֶת עַמּוֹ בַּשָּׁלוֹם" — Operational serenity = clarity + safety.
