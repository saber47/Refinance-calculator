# Mortgage Refinance & Investment Calculator

A privacy-friendly, single-file static calculator comparing refinancing costs, monthly principal-and-interest savings, invested cash flow, and remaining mortgage equity.

## Run locally
Open `index.html` in any modern browser. No installation, account, or server required.

## Publish with GitHub Pages
1. Create a **public** GitHub repository, e.g. `refinance-calculator`.
2. Upload `index.html` and this README to the repository root on the `main` branch.
3. In repository **Settings → Pages**, select **Deploy from a branch**, `main`, `/ (root)` and save.
4. Your URL will normally be `https://YOUR-USERNAME.github.io/refinance-calculator/` after deployment.

The example inputs are generic and are not user-specific. Refinance fees default to an editable 2% estimate of the outstanding balance; editing the dollar value locks the override until the user re-enables the percentage estimate. The basic results show monthly payment savings, simple cash-flow break-even, interest savings, and net wealth benefit. An expandable advanced section shows interest-based break-even measures, investment opportunity costs, and a projection chart. Calculations run locally in the browser. No external scripts, trackers, cookies, local or session storage, IndexedDB, or network calls are used. Inputs are held in page memory only and are not added to URLs.

## Model assumptions
- Both loans amortize monthly at constant rates throughout the selected horizon.
- Investment returns are an annual effective rate, converted to an equivalent monthly rate.
- Monthly P&I differences are invested at the end of each month; if negative, they are a cash-flow cost.
- Cash-paid fees reduce invested wealth at their compounded opportunity cost; financed fees increase loan principal.
- Home-equity difference equals old outstanding principal minus new outstanding principal at the horizon.
- Net wealth benefit equals invested savings (net of fees) plus home-equity difference.
- Break-even is the first month when the relevant net benefit is nonnegative.

This model does not forecast ARM resets or model taxes, PMI, escrow/prepaids, or investment risk.
## Break-even definitions
- **Simple cash-flow:** monthly payment savings accumulate until they equal cash-paid closing costs. This does not measure interest saved or principal differences.
- **Simple interest:** cumulative interest avoided equals upfront cash fees.
- **Investment-adjusted interest:** the future value of monthly interest savings equals the future value of upfront cash fees at the assumed investment return.
- **Net wealth:** invested monthly payment differences less compounded cash fees, plus the difference in outstanding mortgage balances.

For fees financed into the new mortgage, their effect is included in the new principal and interest rather than treated as an upfront cash expense. The model assumes fixed rates through the comparison period and limits the horizon to the shorter remaining loan term.
