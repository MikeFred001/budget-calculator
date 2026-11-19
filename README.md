# Neon Finance

Track recurring payments, monthly income, and debt. Financial records are saved
by the budget API and reloaded when you refresh.

## Run locally

Use Node.js 22.18 or later. Start the Express API from the separate
`budget-calculator-server` checkout with its PostgreSQL database configured.
The frontend uses `http://localhost:8080/api` by default. To use a different API,
set `NEXT_PUBLIC_API_URL` in `.env.local` before starting development or
building for production. Include the `/api` prefix and allow the frontend's
origin in the API's CORS configuration.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

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
