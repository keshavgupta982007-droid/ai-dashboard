import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Notes from './pages/Notes'
import CalendarPage from './pages/CalendarPage'

/**
 * Root App component.
 * Handles dark/light mode toggle and top-level routing.
 */
export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('ai-dark-mode') !== 'false'
    } catch {
      return true
    }
  })

  // Apply dark class to <html> and persist preference
  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      root.classList.remove('light')
      document.body.style.background = ''
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
      // Light mode: soft warm white background
      document.body.style.background = 'linear-gradient(135deg, #f0f4ff 0%, #e8ecff 50%, #f4f0ff 100%)'
      document.body.style.color = '#1e1b4b'
    }
    try {
      localStorage.setItem('ai-dark-mode', String(darkMode))
    } catch { /* ignore */ }
  }, [darkMode])

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      {/* Sticky Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* ── Light mode: overlay body color ────────────────── */}
      {!darkMode && (
        <style>{`
          body { color: #1e1b4b !important; }
          .glass-card {
            background: rgba(255,255,255,0.7) !important;
            border-color: rgba(99,102,241,0.15) !important;
            color: #1e1b4b;
          }
          .text-slate-200, .text-slate-300 { color: #2d2b55 !important; }
          .text-slate-400 { color: #4a4880 !important; }
          .text-slate-500 { color: #6b6a9e !important; }
          .text-slate-600 { color: #8888b0 !important; }
          .text-white { color: #0f0e2e !important; }
          input, textarea, select {
            color: #1e1b4b !important;
          }
          input::placeholder, textarea::placeholder { color: #a8a8c8 !important; }
        `}</style>
      )}

      {/* Main content */}
      <main className={!darkMode ? 'min-h-screen' : ''}>
        <Routes>
          <Route path="/"         element={<Dashboard />} />
          <Route path="/tasks"    element={<Tasks />} />
          <Route path="/notes"    element={<Notes />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </main>
    </div>
  )
}
