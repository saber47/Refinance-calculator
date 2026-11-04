# Mortgage Refinance Calculator

Privacy-first static mortgage refinance calculator. No analytics, cookies, storage, third-party scripts, or data transmission. Generic sample values only.

## Structure
- `index.html` — accessible markup and inputs
- `styles.css` — presentation
- `src/model.js` — pure amortization, cash-flow, investment, and break-even calculations
- `src/chart.js` — canvas visualization
- `src/app.js` — DOM bindings and UI rendering
- `tests/model.test.js` — Node built-in unit tests
- `tests/e2e/calculator.spec.js` — Playwright browser integration tests
- `.github/workflows/deploy.yml` — test-gated GitHub Pages deployment

## Local development
Serve the repository directory using `python3 -m http.server 4173` and open http://localhost:4173. ES modules require an HTTP server rather than a file:// URL.

Run `npm install`, `npm test`, `npx playwright install chromium`, then `npm run test:e2e`.

## Model
Rates remain fixed, payments stop at loan payoff, and each monthly payment difference is invested at the end of its month. Cash-paid fees reduce investment wealth at inception; financed fees increase the new principal. Basic uses 0% investment return. Financial gain/loss includes investment or cash-flow differences and outstanding mortgage debt differences. Break-even is the first nonnegative month through the longer loan term. Home appreciation cancels because both choices involve the same house. The model excludes ARM resets, taxes, inflation, and investment volatility.

GitHub Actions tests on pushes and pull requests and deploys only after tests pass. In GitHub Settings → Pages, set Source to **GitHub Actions**.

## Important disclaimer

This calculator is a personal passion project created for educational and experimental purposes. It is not financial, investment, mortgage, tax, or legal advice, and is not intended to be relied upon for financial or investment decisions. Results are based on simplified assumptions and may be inaccurate or incomplete. Please verify information independently and consult qualified professionals before making financial decisions.
