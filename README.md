# Neon Finance

Try a budget dashboard with sample recurring payments, monthly income, and debt.
Edits and view preferences stay in memory and reset when you refresh.

## Run locally

Use Node.js 22.18 or later, then run:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The demo runs entirely in the browser.

## How the budget works

- Monthly recurring costs use 26 payments a year for biweekly bills, 12 for monthly bills, and one for yearly bills. Each monthly average is rounded to cents before summing so the visible rows add up to the displayed total.
- Due dates include today. Monthly and yearly schedules use the original start day and temporarily fall back to the last day of shorter months. Biweekly schedules recur every 14 calendar days.
- Debt balances are displayed separately. Only scheduled payments count toward monthly recurring costs.

## Verify changes

```sh
npm run lint
npm run typecheck
npm test
npm run build
```
