import { useRef } from 'react'
import { Calendar, Bell, Cloud, MessageSquareQuote, BarChart3, TrendingUp } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { INITIAL_TASKS, INITIAL_NOTES } from '../utils/data'
import HeroSection from '../components/HeroSection'
import TasksPanel from '../components/TasksPanel'
import NotesPanel from '../components/NotesPanel'
import CalendarWidget from '../components/CalendarWidget'
import ReminderWidget from '../components/ReminderWidget'
import WeatherWidget from '../components/WeatherWidget'
import QuoteWidget from '../components/QuoteWidget'
import AISuggestions from '../components/AISuggestions'
import Footer from '../components/Footer'

/**
 * Main Dashboard page — hero + grid layout + widgets.
 */
export default function Dashboard() {
  const dashboardRef = useRef(null)
  const [tasks] = useLocalStorage('ai-tasks', INITIAL_TASKS)
  const [notes] = useLocalStorage('ai-notes', INITIAL_NOTES)

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const pendingTasks = tasks.filter(t => !t.completed).length
  const completedTasks = tasks.filter(t => t.completed).length
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0

  return (
    <div>
      {/* ── Hero ────────────────────────────────────── */}
      <HeroSection onGetStarted={scrollToDashboard} />

      {/* ── Main Dashboard ─────────────────────────── */}
      <section ref={dashboardRef} className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 scroll-mt-20">

{/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
          <span className="text-xs font-display font-700 text-slate-400 uppercase tracking-widest px-4 bg-navy-800/50 py-1.5 rounded-full border border-white/[0.05]">
            Your Dashboard
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
        </div>

{/* ── Stats Row ───────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total Tasks', value: tasks.length, Icon: BarChart3, color: 'text-indigo-400', bg: 'bg-indigo-500/15' },
            { label: 'Pending', value: pendingTasks, Icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/15' },
            { label: 'Completed', value: completedTasks, Icon: BarChart3, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
            { label: 'Completion', value: `${completionRate}%`, Icon: TrendingUp, color: 'text-cyan-400', bg: 'bg-cyan-500/15' },
          ].map(({ label, value, Icon, color, bg }) => (
            <div key={label} className="glass-card p-4 flex items-center gap-3 hover:scale-[1.02] transition-transform">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 ring-1 ${color.replace('text-', 'ring-')}/30`}>
                <Icon size={17} className={color} />
              </div>
              <div>
                <p className="font-display font-800 text-xl text-white leading-none">{value}</p>
                <p className="text-xs text-slate-500 font-display font-600 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── AI Suggestion Banner ─────────────────────── */}
        <div className="mb-6">
          <AISuggestions tasks={tasks} notes={notes} />
        </div>

        {/* ── Main 3-column grid ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Tasks */}
          <TasksPanel />

          {/* Notes */}
          <NotesPanel />

{/* Right column: Calendar + Reminders */}
          <div className="flex flex-col gap-4">
            {/* Calendar */}
            <div className="glass-card p-5 hover:scale-[1.01] transition-transform">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center ring-1 ring-violet-400/25">
                  <Calendar size={15} className="text-violet-400" />
                </div>
                <h3 className="font-display font-700 text-sm text-white">Calendar</h3>
              </div>
              <CalendarWidget />
            </div>

            {/* Reminders */}
            <div className="glass-card p-5 hover:scale-[1.01] transition-transform">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center ring-1 ring-amber-400/25">
                  <Bell size={15} className="text-amber-400" />
                </div>
                <h3 className="font-display font-700 text-sm text-white">Reminders</h3>
              </div>
              <ReminderWidget />
            </div>
          </div>
        </div>

{/* ── Widgets row ───────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Weather */}
          <div className="glass-card p-5 hover:scale-[1.01] transition-transform">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 flex items-center justify-center ring-1 ring-sky-400/25">
                <Cloud size={15} className="text-sky-400" />
              </div>
              <h3 className="font-display font-700 text-sm text-white">Weather</h3>
            </div>
            <WeatherWidget />
          </div>

          {/* Daily Quote */}
          <div className="glass-card p-5 hover:scale-[1.01] transition-transform">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center ring-1 ring-rose-400/25">
                <MessageSquareQuote size={15} className="text-rose-400" />
              </div>
              <h3 className="font-display font-700 text-sm text-white">Daily Quote</h3>
            </div>
            <QuoteWidget />
          </div>

{/* Productivity summary */}
          <div className="glass-card p-5 bg-gradient-to-br from-indigo-500/15 to-cyan-500/15 border border-indigo-500/25 hover:scale-[1.01] transition-transform">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow ring-2 ring-white/10">
                <TrendingUp size={15} className="text-white" />
              </div>
              <h3 className="font-display font-700 text-sm text-white">Today's Focus</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400 font-display font-600">Task Progress</span>
                  <span className="text-white font-display font-700">{completionRate}%</span>
                </div>
                <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden ring-1 ring-white/5">
                  <div
                    className="h-full bg-gradient-accent rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(99,102,241,0.4)]"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-white/[0.08] space-y-2">
                {[
                  { label: 'Notes created', value: notes.length, color: 'text-cyan-400' },
                  { label: 'Tasks completed', value: completedTasks, color: 'text-emerald-400' },
                  { label: 'Pending tasks', value: pendingTasks, color: 'text-amber-400' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className="text-slate-500">{label}</span>
                    <span className={`font-display font-700 ${color}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
