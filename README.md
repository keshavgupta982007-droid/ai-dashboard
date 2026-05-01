# 🧠 AI Productivity Dashboard

A modern, frontend-only **SaaS-style productivity dashboard** built with React.
This application combines tasks, notes, calendar, and smart AI-like suggestions into a single, clean interface designed to enhance productivity and user experience.

---

## 🚀 Features

### 📋 Task Management

* Add, delete, and complete tasks
* Priority indicators
* Filtering and sorting options
* Bulk clear functionality

### 📝 Notes System

* Create and manage notes
* Color-tag organization
* Inline editing support

### 📅 Calendar

* Interactive calendar widget
* Full monthly view page
* Event sidebar for better planning

### ⏰ Reminders

* Add, toggle, and delete reminders
* Simple and intuitive UI

### 🤖 AI Suggestions (Mock)

* Dynamic suggestions based on user activity
* Multiple intelligent states such as:

  * Task overload alerts
  * Productivity hints
  * Empty state guidance

### 🌦️ Widgets

* Weather widget (mock data with forecast)
* Daily quote generator
* Reminder summary

### 🎨 UI/UX

* Modern SaaS-inspired design
* Fully responsive layout
* Dark mode support 🌙
* Smooth transitions and hover effects

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar
│   ├── HeroSection
│   ├── TasksPanel
│   ├── TaskCard
│   ├── NotesPanel
│   ├── NoteCard
│   ├── CalendarWidget
│   ├── ReminderWidget
│   ├── WeatherWidget
│   ├── QuoteWidget
│   ├── AISuggestions
│   └── Footer
│
├── pages/
│   ├── Dashboard
│   ├── Tasks
│   ├── Notes
│   └── Calendar
│
├── hooks/
│   └── useLocalStorage
│
├── utils/
│   └── data.js
```

---

## ⚙️ Tech Stack

* **React (Functional Components + Hooks)**
* **Tailwind CSS**
* **JavaScript (ES6+)**
* Local Storage (for persistent state)

---

## 📦 Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/ai-productivity-dashboard.git
```

2. Navigate into the project folder:

```bash
cd ai-productivity-dashboard
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open in browser:

```
http://localhost:5173
```

---

## 🧠 AI Suggestion Logic (Simulation)

The AI system is **frontend-simulated** using conditional logic based on user activity.

Examples:

* High number of tasks → productivity warning
* No tasks → onboarding suggestion
* Active usage → motivational feedback

---

## 📱 Responsiveness

The dashboard is fully responsive and optimized for:

* Desktop 💻
* Tablet 📱
* Mobile 📲

---

## ✨ Future Improvements

* Backend integration (Node.js / Firebase)
* Real AI integration (OpenAI API)
* User authentication system
* Cloud sync across devices
* Drag-and-drop task management

---

## 📄 License

This project is for educational purposes and personal use.

---

## 🙌 Acknowledgements

Inspired by modern productivity tools and SaaS platforms like Notion, Google Calendar, and other dashboard-based applications.

---

## 📬 Contact

For any queries or suggestions, feel free to reach out.

---
