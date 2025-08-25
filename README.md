# EventEase — Event Management App

A professional event management web application built with **Next.js + TypeScript**, **Auth.js (credentials with bcrypt)**, **Prisma + PostgreSQL**, and **TailwindCSS**.  
Implements **role-based access**, **event CRUD**, **public event pages with RSVP capture**, **attendee CSV export**, robust validation, and a polished, responsive UI.

---
LINK OF THE SCREENSHOT OF WEBAPP - https://github.com/amitiii/event-management/blob/main/Screenshot%202025-08-26%20044928.png

## 🔗 Repository

- **GitHub:** https://github.com/amitiii/event-management

---

## 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript, TailwindCSS  
- **Auth:** Auth.js (NextAuth v5 beta) – Credentials (email & password) with bcrypt  
- **Backend:** Prisma ORM + PostgreSQL  
- **Validation:** Zod  
- **Deployment:** Vercel (app) + Supabase/Neon (Postgres)

---

## 👤 Roles & Permissions

- **Admin** – Full access to all events and exports  
- **Staff** – Manage all events and exports  
- **Event Owner** – Manage **only** their events; export their attendees

Role checks are enforced in server components/actions and API routes.

---

## ✨ Features

- 🔒 **Secure Auth** (email + password, bcrypt-hashed)  
- 🧰 **Role-based guards** (Admin/Staff/Owner)  
- 🗓️ **Event CRUD** (create/edit/delete) via server actions + Zod validation  
- 🌐 **Public Event Page** at `/event/[publicId]`  
- ✅ **RSVP capture & secure storage**  
- 📤 **CSV export** of attendees (role-guarded)  
- 📱 **Responsive UI** (Tailwind)  
- 🧪 **Robust validation & error handling** (Zod + guards)  
- 🧾 **Repo hygiene:** detailed README, `.env.example`, sample creds, live URL placeholder  
- 🦶 **Footer** with developer’s name + GitHub + LinkedIn (fed by env)

---

## ⚡ Quick Start (Local)

### 1) Clone & Install
```bash
git clone https://github.com/amitiii/event-management.git
cd event-management
npm i
```
### 2) Setup Env

Copy the example file and fill in your secrets:
```bash

cp .env.example .env.local
```
### 2) Then open .env.local and set:
```bash
DATABASE_URL="postgresql://postgres:YOURPASSWORD@localhost:5432/eventease?schema=public"
NEXTAUTH_SECRET="replace-with-strong-random-string"
NEXTAUTH_URL="http://localhost:3000"

FOOTER_NAME="Amiti Sharma"
FOOTER_GITHUB="https://github.com/amitiii"
FOOTER_LINKEDIN="https://www.linkedin.com/in/amiti-sharma"
```
### Generate a strong secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
### Setup Database
```bash
npx prisma generate
npm run prisma:push
npm run prisma:seed
```
### Run Dev Server
```bash
npm run dev
```
Open: http://localhost:3000

### Sample Users (Seeded)
Admin	admin@eventease.dev	Admin@123
Staff	staff@eventease.dev	Staff@123
Owner	owner@eventease.dev	Owner@123

Use Sign in (top-right). Owners see only their events; Staff/Admin see all.
### App Tour

Dashboard → Create Event: Add title, description, date/time, location.

Public page: On an event card, Public page opens /event/[publicId].

RSVP: On the public page, submit Name + Email; stored securely.

Export CSV: Dashboard → Event card → Export CSV to download attendees-[publicId].csv.

### Scripts
```bash
npm run dev            # Start dev server
npm run build          # Production build
npm start              # Start production server
npx prisma generate    # Generate Prisma client
npm run prisma:push    # Push schema to DB (create tables)
npm run prisma:seed    # Seed sample users + sample event
```
### Author

Name: Amiti Sharma





