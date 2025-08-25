# EventEase — Event Management App

A professional event management web application built with **Next.js 14 + TypeScript**, **Auth.js (credentials with bcrypt)**, **Prisma + PostgreSQL**, and **TailwindCSS**.  
Implements **role-based access**, **event CRUD**, **public event pages with RSVP capture**, **attendee CSV export**, and more — all with robust validation and a polished responsive UI.

---

## 🚀 Tech Stack
- **Frontend**: Next.js 14 (App Router, TypeScript), TailwindCSS
- **Auth**: Auth.js (NextAuth v5 beta) — Email & Password with bcrypt
- **Backend**: Prisma ORM + PostgreSQL
- **Validation**: Zod
- **UI**: TailwindCSS, responsive layouts
- **Deployment**: Vercel + Supabase/Neon (Postgres)

---

## 👤 Roles & Permissions
- **Admin** → Full access (all events, attendee exports)  
- **Staff** → Manage all events, exports allowed  
- **Event Owner** → Manage only their events, export own attendee list  

---

## ✨ Features
- 🔒 **Secure Auth** (email + password, bcrypt hashed)
- 👤 **Role-based routes & guards**
- 📅 **Event CRUD** (create, edit, delete)
- 🌐 **Public Event Page** (`/event/[publicId]`)
- ✅ **RSVP capture + storage** (validated with Zod)
- 📤 **Attendee CSV export**
- 📱 **Responsive UI** with Tailwind
- 🛠️ **Robust validation & error handling**
- 📄 **README + .env.example + sample creds**
- 👣 **Footer** dynamically shows developer’s name + GitHub + LinkedIn (from env vars)

---

## 🧑‍💻 Developer
- **Name**: Amiti Sharma  
- **GitHub**: [github.com/amiti-sharma](https://github.com/amitiii)  
- **LinkedIn**: [linkedin.com/in/amiti-sharma](https://www.linkedin.com/in/amiti-sharma-8b1157254/)

---

## ⚡ Quick Start (Local)

### 1. Clone & Install
```bash
git clone https://github.com/amiti-sharma/eventease.git
cd eventease
npm i
