# Society Gate ERP (MyGate-like Prototype)

A Vite + React + Tailwind society management prototype that blends **visitor management** and **ERP** for apartments/housing societies. Designed like an architect for clean structure, modularity, and future scalability.

## Quick Start

```bash
npm install
npm run dev
```

## Tech Choices (Architectural Rationale)

- **Vite + React 18**: fast dev server, modern build.
- **TailwindCSS**: utility-first, consistent design system.
- **React Router v6**: feature modules by route.
- **Zustand**: lightweight centralized store; swappable for Redux if needed.
- **Recharts**: simple analytics visualization.

## Folder Structure

```
src/
  components/   # Reusable UI atoms/molecules
  pages/        # Feature modules
  store/        # App state
  assets/       # Static assets
```

## Data Model (MVP)

- **Visitor**: { id, name, purpose, flat, inTime, outTime, vehicle }
- **Ticket**: { id, title, status, unit, priority, createdAt }
- **Invoice**: { id, unit, month, amount, status, dueDate }
- **Resident**: { id, owner, phone, vehicles, members, dues }
- **Staff**: { id, name, role, shift, phone }
- **Announcement**: { id, title, body, date }

## UX Highlights

- Collapsible **sidebar**, sticky header, global search.
- **Fancy ERP cards** (stats), tables with badges.
- **Fast actions**: create ticket, invoice, visitor check-in.

## Extensibility Roadmap

- Auth & roles: Admin, Guard, Resident (route guards).
- Backend API: swap Zustand with RTK Query/React Query + REST/GraphQL.
- Realtime updates: WebSocket for gate events.
- QR/OTP: guard app with camera integration.
- Payments: Razorpay/UPI for invoices.
- Audit logs & notifications.

## Styling System

- Tailwind theme with `brand` color scale.
- Soft shadows and rounded-2xl radius for a clean, modern look.

---

Built as a clean foundation you can evolve into a full production system.
