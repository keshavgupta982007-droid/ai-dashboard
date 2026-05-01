import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CheckSquare, FileText, Calendar, Moon, Sun, Bell, Zap } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { INITIAL_REMINDERS, INITIAL_TASKS } from '../utils/data'

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(null) // 'bell' | 'avatar' | null
  const dropRef = useRef(null)

  const [tasks] = useLocalStorage('ai-tasks', INITIAL_TASKS)
  const [reminders] = useLocalStorage('ai-reminders', INITIAL_REMINDERS)

  const pendingReminders = reminders.filter(r => !r.done)
  const completedTasks = tasks.filter(t => t.completed)
  const pendingTasks = tasks.filter(t => !t.completed)
  const rate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0

  // Sticky glass effect on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navLinks = [
    { to: '/',         label: 'Dashboard', Icon: LayoutDashboard },
    { to: '/tasks',    label: 'Tasks',     Icon: CheckSquare },
    { to: '/notes',    label: 'Notes',     Icon: FileText },
    { to: '/calendar', label: 'Calendar',  Icon: Calendar },
  ]

return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-navy-900/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="font-display font-800 text-lg tracking-tight text-white">
            Productive<span className="gradient-text">AI</span>
          </span>
        </NavLink>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label, Icon }) => (
            <li key={to}>
<NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-display font-600 transition-all duration-300 hover:scale-[1.02] ${
                    isActive
                      ? 'bg-indigo-500/25 text-indigo-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-indigo-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.08] hover:ring-1 hover:ring-white/10'
                  }`
                }
              >
                <Icon size={15} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-2" ref={dropRef}>

{/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.1] transition-all hover:scale-105"
            title="Toggle theme"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* ── Bell dropdown ── */}
          <div className="relative">
            <button
              onClick={() => setDropOpen(dropOpen === 'bell' ? null : 'bell')}
              className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.1] transition-all hover:scale-105"
              title="Notifications"
            >
              <Bell size={17} />
              {pendingReminders.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-400 rounded-full animate-pulse-slow ring-2 ring-navy-900" />
              )}
            </button>

            {dropOpen === 'bell' && (
              <div className="absolute right-0 top-11 w-64 glass-card p-3 z-50 animate-slide-up">
                <p className="text-xs font-display font-600 text-slate-500 uppercase tracking-widest mb-3">
                  Reminders · {pendingReminders.length} pending
                </p>

                {reminders.length === 0 ? (
                  <p className="text-xs text-slate-600 text-center py-3">No reminders yet</p>
                ) : (
                  <div className="space-y-1">
                    {reminders.map(r => (
                      <div
                        key={r.id}
                        className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-all ${
                          r.done ? 'opacity-40' : ''
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          r.done ? 'bg-slate-600' : 'bg-indigo-400'
                        }`} />
                        <span className={`flex-1 text-xs ${
                          r.done ? 'line-through text-slate-500' : 'text-slate-200'
                        }`}>
                          {r.text}
                        </span>
                        {r.time && (
                          <span className="text-[10px] text-slate-600 flex-shrink-0">{r.time}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-3 pt-2 border-t border-white/[0.06]">
                  <p className="text-[10px] text-slate-600 text-center">
                    Manage reminders in Dashboard
                  </p>
                </div>
              </div>
            )}
          </div>

{/* ── Avatar dropdown ── */}
          <div className="relative">
            <button
              onClick={() => setDropOpen(dropOpen === 'avatar' ? null : 'avatar')}
              className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center text-white font-display font-700 text-sm cursor-pointer hover:scale-105 transition-all shadow-glow ring-2 ring-white/10"
              title="Profile"
            >
              A
            </button>

            {dropOpen === 'avatar' && (
              <div className="absolute right-0 top-11 w-64 glass-card p-4 z-50 animate-slide-up">
                {/* Profile info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center text-white font-display font-700 shadow-glow">
                    A
                  </div>
                  <div>
                    <p className="text-sm font-display font-700 text-white">Alex</p>
                    <p className="text-xs text-slate-500">alex@productiveai.app</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="border-t border-white/[0.06] pt-3 space-y-2.5">
                  <p className="text-xs font-display font-600 text-slate-500 uppercase tracking-widest mb-2">
                    Today's stats
                  </p>
                  {[
                    { label: 'Tasks completed', value: completedTasks.length, color: 'text-emerald-400' },
                    { label: 'Pending tasks',   value: pendingTasks.length,   color: 'text-amber-400' },
                    { label: 'Completion rate', value: `${rate}%`,            color: 'text-indigo-400' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex justify-between text-xs">
                      <span className="text-slate-500">{label}</span>
                      <span className={`font-display font-700 ${color}`}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-3 pt-3 border-t border-white/[0.06]">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500">Overall progress</span>
                    <span className="text-white font-display font-700">{rate}%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-accent rounded-full transition-all duration-500"
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-white/[0.08] transition-all ml-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>

        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-4 space-y-1 bg-navy-900/90 backdrop-blur-xl border-b border-white/[0.06]">
          {navLinks.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-display font-600 transition-all ${
                  isActive ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}