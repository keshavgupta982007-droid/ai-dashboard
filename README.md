# ⚡ ProductiveAI — AI Productivity Dashboard

A premium, full-featured SaaS-style productivity dashboard built with **React + Tailwind CSS**.

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🗂 Task Management | Add, complete, delete, filter, sort by priority |
| 📝 Notes | Create, edit inline, color-tag, search |
| 📅 Calendar | Full monthly view, click-to-add events |
| 🔔 Reminders | Add/toggle/delete reminders |
| 🤖 AI Suggestions | Dynamic tips based on your task state |
| 🌤 Weather Widget | Mock weather with 4-day forecast |
| 💬 Daily Quote | Rotating motivational quotes |
| 🌙 Dark/Light Mode | Full theme toggle with persistence |
| 💾 localStorage | All data persists across browser sessions |
| 📱 Responsive | Mobile + tablet + desktop layouts |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

### 3. Open in browser

```
http://localhost:5173
```

---

## 🏗 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky top navigation
│   ├── HeroSection.jsx     # Landing hero with CTA
│   ├── TaskCard.jsx        # Individual task item
│   ├── TasksPanel.jsx      # Task panel (dashboard)
│   ├── NoteCard.jsx        # Editable note card
│   ├── NotesPanel.jsx      # Notes panel (dashboard)
│   ├── CalendarWidget.jsx  # Compact calendar widget
│   ├── ReminderWidget.jsx  # Reminder list widget
│   ├── WeatherWidget.jsx   # Weather card
│   ├── QuoteWidget.jsx     # Daily quote card
│   ├── AISuggestions.jsx   # AI insight banner
│   └── Footer.jsx          # Footer
│
├── pages/
│   ├── Dashboard.jsx       # Main dashboard page
│   ├── Tasks.jsx           # Full tasks page
│   ├── Notes.jsx           # Full notes page
│   └── CalendarPage.jsx    # Full calendar page
│
├── hooks/
│   └── useLocalStorage.js  # Persistent state hook
│
├── utils/
│   └── data.js             # Mock data + AI logic
│
├── App.jsx                 # Router + dark mode
├── main.jsx                # Entry point
└── index.css               # Global styles + Tailwind
```

---

## 🎨 Tech Stack

- **React 18** — functional components + hooks
- **React Router v6** — client-side routing
- **Tailwind CSS v3** — utility-first styling
- **Vite** — lightning-fast build tool
- **date-fns** — date manipulation
- **lucide-react** — icon library

---

## 🛠 Build for production

```bash
npm run build
```

Output is in the `dist/` folder — deploy to Vercel, Netlify, or any static host.

---

## 💡 How AI Suggestions Work

The `getAISuggestion()` function in `src/utils/data.js` analyzes:
- Number of pending tasks
- Number of high-priority tasks  
- Overall completion rate
- Whether notes exist

It returns a typed suggestion (`info` | `warning` | `success`) with a contextual message displayed in the dashboard banner.

---

## 📦 Key Dependencies

```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.22.0",
  "date-fns": "^3.3.1",
  "lucide-react": "^0.344.0",
  "tailwindcss": "^3.4.1",
  "vite": "^5.1.6"
}
```
