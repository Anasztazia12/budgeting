# Budgeting App

This is a browser budgeting app project. It works in Hungarian and English, runs locally, and helps with tracking income/expenses, summary, and forecast.

## Table of Contents

- Overview
- What this project is for
- What it does and what it does not do
- Project structure
- Main pages
- Data storage
- Language handling (HU/EN)
- PWA and offline notes
- How to run locally
- Error handling and troubleshooting
- Testing
- Manual test list
- Release checklist
- Accessibility and UX notes
- Security and privacy notes
- Known limitations
- Future ideas

## Overview

The main idea was to make a simple budgeting workflow without backend setup.

You can:

- create local account or use guest mode
- add/edit/delete income and expense entries
- check period summary values
- try forecast with extra what-if rows
- switch between light and dark mode
- export data to CSV

Everything is client-side, so data is saved in browser storage.

## What this project is for

This app is useful if you want a fast way to track money on one device.

Typical flow:

1. Open app and sign in (or use guest mode).
1. Add entries with amount, date, category.
1. Check summary and forecast pages.
1. Export CSV if needed.

## What it does and what it does not do

### In scope

- local auth (browser only)
- budget entry CRUD
- period summary
- forecast planner
- language/theme/currency preferences
- light/dark mode switch with saved preference
- PWA install support

### Out of scope (current version)

- backend API
- cloud sync
- bank import/integration
- multi-device account sync

## Project structure

| Layer | Used tech | Why it is here |
| --- | --- | --- |
| UI | HTML + CSS | Forms, cards, page layout, responsive behavior |
| Logic | Vanilla JavaScript | State handling, CRUD logic, i18n, calculations |
| Storage | localStorage/sessionStorage | Save users, settings, entries |
| PWA | Service worker + manifest | Install and caching |
| Dev server | Node HTTP server | Quick local run |

## Main pages

| Page | Purpose |
| --- | --- |
| index.html | Start page (register/login/guest) |
| budget.html | Main budgeting page |
| budget-forecast.html | Forecast planner page |
| monthly_budget.html | Summary page |

## Data storage

Data is stored with browser keys (localStorage/sessionStorage).

### Main keys

| Key | Meaning |
| --- | --- |
| budgetAppUsers | Registered local users and their data |
| budgetAppSession | Current active session |
| budgetAppLanguage | Selected language |
| budgetAppTheme | Theme mode (light/dark) |
| budgetAppCurrency | Selected currency |
| budgetAppInstalled | Install status flag |
| budgetAppGuestData | Guest mode entries |
| budgetAppFlashMessage | One-time message between pages |

### Entry format (simplified)

- id
- type (income/expense)
- category
- amount
- date
- note (optional)
- repeatMonthly (boolean)
- excludedMonths (optional)

## Language handling (HU/EN)

The app uses dictionary objects in page scripts and data-i18n attributes in HTML.

Important rules for maintenance:

- keep HU and EN keys aligned
- menu labels should match across pages
- fallback HTML text should not conflict with final translated labels

### Terminology

| Concept | HU | EN |
| --- | --- | --- |
| Budget | Koltsegvetes | Budget |
| Forecast | Koltsegvetesi elorejelzo | Budget Forecast Planner |
| Summary | Osszesites | Summary |
| Sign out | Kijelentkezes | Sign out |

## PWA and offline notes

Service worker is cache-first for GET requests:

- install: cache predefined files
- activate: clean old cache versions
- fetch: cache -> network -> fallback

If you change UI text or static files and still see old content, increase cache version in sw.js.

## How to run locally

### Prerequisite

- Node.js 18+ recommended

### Start

1. Install Node.js (if not installed).
1. Run:

```bash
npm start
```

1. Open:

- <http://localhost:3000>

### Optional custom port

```bash
PORT=4200 npm start
```

PowerShell example:

```powershell
$env:PORT=4200; npm start
```

### Fallback without Node

```bash
py -m http.server 3000
```

## Error handling and troubleshooting

### Common user-facing situations

| Case | What user sees | Common reason |
| --- | --- | --- |
| Wrong login | Invalid username/password | Typo or wrong local account |
| Email mismatch | Emails do not match | Register form mismatch |
| Password mismatch | Passwords do not match | Register form mismatch |
| Empty period | No entries in selected period | No records for filter range |
| Install not available | Install unavailable message | Browser/platform limitation |

### Troubleshooting table

| Problem | Likely cause | Fix |
| --- | --- | --- |
| 404 on local assets | Server not started from project root | Start server in repo root |
| Old UI text still visible | Service worker cache still active | Hard refresh and bump cache version |
| Language switch half-working | Missing key in one dictionary | Compare HU and EN dictionaries |
| Data "disappeared" | Browser storage cleared/profile changed | Check same browser profile and storage |
| Install prompt not showing | Criteria not met by browser | Use Add to Home Screen menu path |

### Quick debug steps

1. Open browser console.
1. Check localStorage/sessionStorage keys.
1. Verify selected language key and current dictionary values.
1. Check service worker status.

## Testing

At the moment this project is tested manually (no full automated suite yet).

### Test types we use

| Test type | What we check | When |
| --- | --- | --- |
| Smoke test | App opens, navigation works, no crash | Every change |
| Functional test | CRUD, summary, forecast, export | Feature changes |
| i18n check | HU/EN labels and menu consistency | Text/UI changes |
| Responsive check | Mobile and desktop layout sanity | Before release |
| Offline/PWA check | Cached startup behavior | Before release |

### Browser matrix (recommended)

| Browser | Desktop | Mobile |
| --- | --- | --- |
| Chrome | Yes | Yes |
| Edge | Yes | Optional |
| Firefox | Yes | Optional |
| Safari | Optional | Yes |
| Samsung Internet | Optional | Yes |

## Manual test list

### Authentication

| ID | Test step | Expected |
| --- | --- | --- |
| AUTH-01 | Register with valid values | Success + user saved locally |
| AUTH-02 | Register with mismatched email | Validation message |
| AUTH-03 | Login with correct credentials | Session active |
| AUTH-04 | Login with wrong password | Error message |
| AUTH-05 | Continue as guest | Guest session active |
| AUTH-06 | Logout from hamburger menu | Session cleared |
| AUTH-07 | Change password with new value | Password updated successfully |
| AUTH-08 | Change password with previously used value | Rejected with validation message |
| AUTH-09 | Reset password via email link with new value | Password reset successful |
| AUTH-10 | Reset password via email link with previously used value | Rejected with validation message |

### Budget CRUD and recurring

| ID | Test step | Expected |
| --- | --- | --- |
| BUD-01 | Add income | Appears in list and affects totals |
| BUD-02 | Add expense | Appears in list and affects totals |
| BUD-03 | Edit entry | New values visible |
| BUD-04 | Delete entry | Removed and totals recalculated |
| BUD-05 | Toggle recurring | Badge/action label updates |
| BUD-06 | Date filtering | Only matching entries shown |

### Forecast and summary

| ID | Test step | Expected |
| --- | --- | --- |
| FC-01 | Set target date | Forecast values recalc |
| FC-02 | Add extra expense row | Simulated balance decreases |
| FC-03 | Add extra income row | Simulated balance increases |
| FC-04 | Remove row | Forecast updates correctly |
| SUM-01 | Open summary | Cards show period totals |
| SUM-02 | Change period | Summary values refresh |

### Language consistency

| ID | Test step | Expected |
| --- | --- | --- |
| I18N-01 | Switch HU -> EN on all pages | Labels translated everywhere |
| I18N-02 | Check summary label in menu | HU: Osszesites, EN: Summary |
| I18N-03 | Check forecast EN wording | Natural English labels |
| I18N-04 | Check fallback text before JS loads | Same meaning as translated UI |

## Release checklist

- All pages open without console errors.
- Hamburger menu works on every page.
- Language switch works on every page.
- Summary wording is consistent.
- Forecast values recalculate correctly.
- CSV export works.
- Theme stays after navigation.
- Service worker cache version checked.
- Manual test list executed.

## Accessibility and UX notes

- Skip link exists for keyboard users.
- ARIA labels are used for key controls.
- Layout is responsive for smaller screens.
- User gets feedback messages after actions.

## Security and privacy notes

- Data stays in browser profile.
- No backend and no third-party API sync.
- If browser storage is cleared, app data is removed.
- Password handling is local, but still browser-profile based.

## Known limitations

- No sync between devices.
- No change history/audit log.
- No bank import.
- No automated tests yet.
- Data can be lost if browser storage is cleared.

## Future ideas

1. Add automated tests (unit + e2e).
1. Add data versioning/migration.
1. Add backup and restore JSON.
1. Improve validation for edge cases.
1. Optional cloud sync later.

## Screenshots

![hungarian ui](assets/images/budgeting-app-hungarian.png)
![english ui](assets/images/budgeting-app-english.png)
![mobile view](assets/images/app-mobile-view.png)

### Password change and reset (tested)

- Password change flow tested: AUTH-07, AUTH-08
- Password reset flow tested: AUTH-09, AUTH-10

![password change result](assets/images/password-changed.png)
![password reset step](assets/images/password-reset.png)
![password reset result](assets/images/password-reset2.png)
