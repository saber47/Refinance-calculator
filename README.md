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

**For educational purposes only — not financial, investment, mortgage, tax, or legal advice.** Results are simplified estimates, not guaranteed, and must not be the sole basis for financial decisions. Independently verify loan terms and calculations with lenders and qualified professionals. The software is provided **as is**, without warranties, and liability is disclaimed to the maximum extent permitted by applicable law. See [DISCLAIMER.md](DISCLAIMER.md) for the full terms and limitations.
