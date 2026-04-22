# Budgeting App

## Overview

### Why this project was created

Managing monthly income and expenses is often fragmented: people track data in notes, messages, spreadsheets, or memory. This project was created to provide a simple, focused budgeting flow in one place with minimal setup.

### What problem it solves

- Lack of one clear monthly budgeting workflow.
- No quick way to compare monthly income vs. monthly expenses.
- Difficulty seeing spent-to-date and expected month-end balance.
- Poor visibility of upcoming dated entries.
- Need for lightweight account separation without backend complexity.

### Main value and benefits

- Fast entry and editing of financial records.
- Immediate monthly summary metrics.
- Better short-term planning with projected balance.
- CSV export for reporting or offline analysis.
- Bilingual interface (HU/EN) for wider usability.

## 1. Strategy

The strategy is to deliver a practical browser-based budgeting app with strong day-to-day usability first, then scale to a production architecture later.

Core strategic goals:

- Keep interaction simple and task-oriented.
- Preserve user-level data separation.
- Support two access modes: registered user and guest.
- Offer bilingual UI and responsive design.
- Start client-side, then evolve toward backend-based security and sync.

## 2. Scope

In scope:

- Registration, sign in, sign out.
- Salted password hashing (no plain-text password storage).
- Guest mode with separate guest data.
- Income/expense CRUD operations.
- Monthly totals and month-end projection.
- Monthly CSV export.
- HU/EN language switching.
- Hamburger menu navigation for authenticated usage.

Out of scope for current version:

- Multi-device cloud sync.
- Server-issued auth tokens and role model.
- Password reset by email.
- Advanced analytics dashboards.

## 3. Structure

### Page structure

- index.html: login gateway (register, sign in, guest) and entry to modules.
- budget.html: budgeting workspace (entry CRUD, stats, export).
- monthly_budget.html: summary view and upcoming dated entries.

### Data structure (LocalStorage)

- budgetAppUsers: registered users and account-specific data.
- budgetAppSession: current active user/guest session.
- budgetAppLanguage: selected interface language.
- budgetAppGuestData: guest-mode entries.

### Domain model

User profile fields (plain explanation):

- email: the user's email address.
- passwordSecurityKey (stored internally as `salt`): a random unique security key used to protect the password.
- passwordFingerprint (stored internally as `hashedPassword`): a one-way encrypted fingerprint of the password (the real password is not stored).
- incomes: the user's saved income items.
- expenses: the user's saved expense items.

Entry fields:

- id
- category
- amount
- date

## 4. Skeleton

### File skeleton

```text
budgeting/
  index.html
  budget.html
  monthly_budget.html
  assets/
    css/
      style.css
    images/
```

### Technical skeleton

- HTML: page composition
- CSS: responsive styles and component visuals
- Vanilla JavaScript: state, interactions, logic
- LocalStorage: persistence layer (client-side)

## 5. Surface

### UI/UX

UI principles:

- Clear hierarchy: entry actions and summary numbers are easy to scan.
- Minimal friction: add/edit/delete operations are direct.
- Consistent controls: reusable cards, forms, buttons, and menu patterns.
- Language clarity: immediate HU/EN translation updates.

UX principles:

- Guided entry flow from login to budgeting pages.
- Immediate feedback on actions (save, update, delete, auth events).
- Session-aware UI (hide irrelevant options after login).
- Mobile-first readability and touch-friendly interactions.

### User Experience (End-to-End)

1. User opens the index page.
2. User chooses register, sign in, or guest mode.
3. User navigates to Budget page and enters monthly items.
4. User reviews KPIs and exports monthly CSV if needed.
5. User opens Monthly Budget to see upcoming entries and projection.
6. User logs out from the hamburger menu.

## MoSCoW Requirements

### Must Have

- Register, sign in, sign out.
- Salted password hashing.
- Session-based access.
- Income/expense CRUD.
- Monthly totals, spent-to-date, and month-end projection.
- Monthly CSV export.
- HU/EN language switching.

### Should Have

- Guest mode with isolated data.
- Responsive layout across desktop and mobile.
- Inline validation and clear action messages.
- Navigation via hamburger menu for logged-in state.

### Could Have

- Custom user-defined categories.
- Basic data visualization (bar/pie trends).
- Import from CSV.
- Optional dark theme.

### Won't Have (Current Release)

- Full backend API and database.
- OAuth/social login.
- Multi-user collaboration.
- Real-time sync across devices.

## Quick Start

1. Open index.html in a browser.
2. Register, sign in, or continue as guest.
3. Open Budget or Monthly Budget and start tracking.

### Manual testing

screenshot on laptop device and on Laptop dev tool phone view

![screenshot1](screenshots/screenshot1.png)

![screenshot1](screenshots/screenshot2.png)

## Note

This is a client-side prototype. For production use, add a backend service, secure server-side sessions, and database storage.
