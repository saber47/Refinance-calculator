# Mortgage Refinance & Investment Calculator

A privacy-friendly, single-file static calculator comparing refinancing costs, monthly principal-and-interest savings, invested cash flow, and remaining mortgage equity.

## Run locally
Open `index.html` in any modern browser. No installation, account, or server required.

## Publish with GitHub Pages
1. Create a **public** GitHub repository, e.g. `refinance-calculator`.
2. Upload `index.html` and this README to the repository root on the `main` branch.
3. In repository **Settings → Pages**, select **Deploy from a branch**, `main`, `/ (root)` and save.
4. Your URL will normally be `https://YOUR-USERNAME.github.io/refinance-calculator/` after deployment.

The example inputs are generic and are not user-specific. Calculations run locally in the browser. No external scripts, trackers, cookies, or network calls are used.

## Model assumptions
- Both loans amortize monthly at constant rates throughout the selected horizon.
- Investment returns are an annual effective rate, converted to an equivalent monthly rate.
- Monthly P&I differences are invested at the end of each month; if negative, they are a cash-flow cost.
- Cash-paid fees reduce invested wealth at their compounded opportunity cost; financed fees increase loan principal.
- Home-equity difference equals old outstanding principal minus new outstanding principal at the horizon.
- Net wealth benefit equals invested savings (net of fees) plus home-equity difference.
- Break-even is the first month when the relevant net benefit is nonnegative.

This model does not forecast ARM resets or model taxes, PMI, escrow/prepaids, or investment risk.