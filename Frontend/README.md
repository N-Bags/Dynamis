# Dynamis

**Dynamis** is an AI-powered business operating system that integrates modern frontend architecture with real-time automation, clean UI, and human-in-the-loop AI functionality.

---

## 🚀 Features

- 🧠 Floating AI Assistant (Echo) on every page  
- 📊 Dashboard with live system data and revenue  
- 📟 CRM with client logging, tagging, and quick actions  
- ✅ Task manager with filtering, subtasks, and scheduling  
- 🗕 Calendar UI (event grid coming soon)  
- 💰 Finances overview with exportable reports  
- 🔌 API integration hub (HubSpot, Zoho, QuoteIQ)  
- ⚙️ Settings (dark mode, preferences, notifications)  
- 👤 Profile view with role summary and recent activity  

---

## 🛠 Tech Stack

- Next.js 15.2 (App Router)  
- React 19.1  
- TailwindCSS 4.1  
- TypeScript 5.8  
- ESLint 9.24  
- Lucide Icons  

---

## 💻 Dev Environment

- Dev environment: **WSL (Ubuntu)** using Cursor.dev  
- Package manager: `npm`  
- Runs locally at `http://localhost:3001`  

---

## 🧹 Project Structure

```
src/
├── app/
│   ├── dashboard/
│   ├── crm/
│   ├── tasks/
│   ├── calendar/
│   ├── finances/
│   ├── integrations/
│   ├── settings/
│   ├── profile/
│   └── layout.tsx
├── components/           # NavDropdown, Sidebar, Echo
└── styles/               # Tailwind + global
```

---

## ⚙️ Setup

```
git clone https://github.com/N-Bags/Dynamis.git
cd Dynamis/Frontend
npm install
npm run dev
```

---

## 🦪 Testing & QA

- ✅ Vitest unit + integration tests coming soon  
- ✅ Lighthouse audits planned  

---

## ✨ Future Plans

- Mobile sidebar collapse  
- Echo autocomplete command palette  
- Server actions + backend integration  
- Role-based access  
- Theming polish 