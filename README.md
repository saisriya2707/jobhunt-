# 🚀 JobHunt — Full-Stack Job Portal

A complete job portal inspired by the Jobby App (CCBP), built with **React + Node.js/Express**, designed to run locally on your laptop.

---

## ✨ What's Included

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | Username + password auth, JWT |
| Home | `/` | Hero search, profile card, category browse |
| Jobs | `/jobs` | List with search, type & salary filters |
| Job Detail | `/jobs/:id` | Full job info, skills, similar jobs |
| 404 | `*` | Not found page |

---

## 🛠 Prerequisites

Make sure these are installed on your laptop:

1. **Node.js** (v16 or higher)  
   → Download: https://nodejs.org  
   → Check: `node --version`

2. **npm** (comes with Node.js)  
   → Check: `npm --version`

---

## 📦 Setup & Run

### Step 1 — Open a terminal and navigate to the project folder
```bash
cd jobhunt
```

### Step 2 — Install dependencies for both frontend and backend

**Terminal 1 — Backend:**
```bash
cd backend
npm install
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
```
> ⚠️ Frontend install takes 2–3 minutes (downloads React). That's normal.

---

### Step 3 — Start the backend server

In Terminal 1 (inside `backend/`):
```bash
npm run dev
```

You should see:
```
✅ JobHunt API → http://localhost:5000
   Login: rahul / rahul@2021
```

---

### Step 4 — Start the frontend

In Terminal 2 (inside `frontend/`):
```bash
npm start
```

Your browser will open **http://localhost:3000** automatically.

---

## 🔑 Login Credentials

| Username | Password |
|----------|----------|
| `rahul` | `rahul@2021` |
| `sriya` | `sriya@2024` |

---

## 📁 Project Structure

```
jobhunt/
├── backend/
│   ├── server.js          ← Express API (port 5000)
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── index.js       ← Entry point
│   │   ├── App.js         ← Routes
│   │   ├── index.css      ← Global styles
│   │   ├── context/
│   │   │   └── AuthContext.js   ← JWT auth state
│   │   ├── components/
│   │   │   ├── Header.js  ← Navbar
│   │   │   ├── JobCard.js ← Job listing card
│   │   │   └── StarRating.js
│   │   └── pages/
│   │       ├── LoginPage.js
│   │       ├── HomePage.js
│   │       ├── JobsPage.js
│   │       ├── JobDetailPage.js
│   │       └── NotFoundPage.js
│   └── package.json
│
└── README.md
```

---

## 🎨 Design Choices (different from reference site)

| Feature | Reference (Jobby App) | JobHunt (this app) |
|---------|----------------------|-------------------|
| Theme | Light, white background | Dark futuristic (GitHub-style dark) |
| Colors | Blue / white | Dark navy + teal accent (#00c9a7) |
| Fonts | Default | Space Grotesk (headings) + Inter (body) |
| Home | Simple find jobs button | Hero with search + category grid |
| Auth | CCBP backend | Local Express JWT backend |
| Cards | Simple list | Cards with hover effect + animations |

---

## 🌐 API Endpoints

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | `/login` | ❌ | Login |
| GET | `/profile` | ✅ | User profile |
| GET | `/jobs` | ✅ | List jobs (supports `?search=`, `?employment_type=`, `?minimum_package=`) |
| GET | `/jobs/:id` | ✅ | Job detail + similar jobs |
| GET | `/health` | ❌ | Health check |

---

## 🔧 Troubleshooting

**"npm: command not found"**  
→ Install Node.js from https://nodejs.org

**"Cannot connect to backend"**  
→ Make sure `backend/` is running on port 5000 first before starting frontend.

**Port 3000 or 5000 already in use?**  
```bash
# Kill port 3000
npx kill-port 3000
# Kill port 5000
npx kill-port 5000
```

**Login says "Network error"?**  
→ Backend isn't running. Open a new terminal, go to `backend/`, run `npm run dev`.
