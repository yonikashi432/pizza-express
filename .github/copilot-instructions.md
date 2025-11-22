# Pizza Express – Copilot Instructions

## Big Picture
- `server.js` hosts a small Express + Jade app where pizzas are created via `/pizzas` POST and rendered by `/` and `/pizzas/:id`; app state lives in `app.locals.pizzas`, so tests mutate that object instead of hitting a database.
- IDs come from `lib/generate-id.js` (crypto hex). Views live under `views/` (`index.jade`, `pizza.jade`) and expect `title`, `pizzas`, and `pizza` locals—keep these names stable when changing controllers.
- Redis is instantiated for demo logging only; thanks to the error handler in `server.js`, the app can run without a Redis daemon. Do not introduce mandatory Redis writes unless you also extend the test harness.

## Developer Workflows
- Install JS deps and run tests with `npm install && npm test`; tests live in `test/server-test.js` and rely on Mocha + Request hitting a real HTTP server listening on port 9876.
- Manual server run: `node server.js`. Because tests expect a clean `app.locals.pizzas`, reset or stub that object in any new test hooks.
- Python helper script: `pip install -r requirements.txt`, then `python3 generate_story.py [--offline] [--env-file .env]`. `--offline` must keep producing deterministic mock text for quota failures.

## Patterns & Conventions
- Routing pattern: keep route handlers thin, mutate `app.locals.pizzas`, then `response.render(...)`. Follow the existing redirect pattern when adding new POST endpoints (generate ID → store on locals → redirect to detail page).
- Jade templates use very little logic; if you need dynamic lists, pass fully prepared arrays/strings from the controller rather than adding heavy logic in the templates.
- Tests expect HTML responses to include `app.locals.title` or pizza names as substrings. When changing markup, preserve those strings or update tests simultaneously.
- Any new middleware should be wired before the routes (see `app.use(express.static('static'))` and `bodyParser.urlencoded`). Keep middleware minimal to avoid affecting the legacy tutorial narrative documented in `README.md`.

## Ancillary Assets
- `seeds/` hosts the "Unified Golden Operator" YAML + docs; these files are documentation-only. When editing tooling or build scripts, avoid assuming `seeds/` content participates in runtime.
- `.vscode/settings.json` is committed; respect existing formatter settings when touching client-side code.

## When Extending the App
- Prefer adding new unit tests beside `test/server-test.js`; reuse the existing `request.defaults` helper so tests hit the ephemeral server.
- If you introduce persistence beyond `app.locals`, keep an opt-out path for tests (mock, in-memory store, or dependency injection). The default workflow must remain "npm install && npm test" without extra services.
- For new command-line utilities, mirror the style of `generate_story.py`: argparse interface, helpful error messages, and graceful fallbacks when environment variables are missing.
