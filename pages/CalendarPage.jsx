import { useState } from 'react'
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval,
  getDay, isSameDay, isToday, addMonths, subMonths,
  startOfWeek, endOfWeek, eachDayOfInterval as eachDay
} from 'date-fns'
import { ChevronLeft, ChevronRight, Calendar, Plus, X } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { generateId } from '../utils/data'

const EVENT_COLORS = ['bg-indigo-400', 'bg-cyan-400', 'bg-rose-400', 'bg-emerald-400', 'bg-amber-400', 'bg-violet-400']
const INITIAL_EVENTS = [
  { id: '1', date: format(new Date(), 'yyyy-MM-dd'), title: "Team standup", color: 'bg-indigo-400' },
  { id: '2', date: format(new Date(), 'yyyy-MM-dd'), title: "Doctor's appointment", color: 'bg-rose-400' },
]

/**
 * Full calendar page with monthly view, event creation, and sidebar event list.
 */
export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useLocalStorage('ai-calendar-events', INITIAL_EVENTS)
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newColor, setNewColor] = useState(EVENT_COLORS[0])

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)

  // Full weeks for grid (Mon-based)
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })
  const gridDays = eachDay({ start: gridStart, end: gridEnd })

  const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const eventsOnDay = (day) => events.filter(e => e.date === format(day, 'yyyy-MM-dd'))
  const selectedEvents = eventsOnDay(selectedDate)

  const addEvent = () => {
    if (!newTitle.trim()) return
    setEvents(ev => [...ev, {
      id: generateId(),
      date: format(selectedDate, 'yyyy-MM-dd'),
      title: newTitle.trim(),
      color: newColor,
    }])
    setNewTitle('')
    setAdding(false)
  }

  const deleteEvent = id => setEvents(ev => ev.filter(e => e.id !== id))

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 animate-slide-up">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
            <Calendar size={18} className="text-violet-400" />
          </div>
          <div>
            <h1 className="font-display font-800 text-3xl text-white">Calendar</h1>
            <p className="text-slate-500 text-sm">{events.length} events scheduled</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Calendar grid ─────────────────────── */}
          <div className="lg:col-span-2 glass-card p-6">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentDate(d => subMonths(d, 1))}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/[0.08] text-slate-400 hover:text-white transition"
              >
                <ChevronLeft size={18} />
              </button>
              <h2 className="font-display font-800 text-xl text-white">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <button
                onClick={() => setCurrentDate(d => addMonths(d, 1))}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/[0.08] text-slate-400 hover:text-white transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_LABELS.map(d => (
                <div key={d} className="text-center text-xs font-display font-600 text-slate-600 py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {gridDays.map(day => {
                const inMonth = day >= monthStart && day <= monthEnd
                const isSelected = isSameDay(day, selectedDate)
                const isTodayDay = isToday(day)
                const dayEvents = eventsOnDay(day)
                const isWeekend = [0, 6].includes(getDay(day))

                return (
                  <button
                    key={day.toString()}
                    onClick={() => setSelectedDate(day)}
                    className={`relative flex flex-col items-center gap-1 min-h-[56px] py-1.5 px-1 rounded-xl transition-all duration-200 ${
                      isSelected
                        ? 'bg-indigo-500/25 ring-1 ring-indigo-400/40'
                        : isTodayDay
                        ? 'bg-cyan-400/10 ring-1 ring-cyan-400/20'
                        : 'hover:bg-white/[0.04]'
                    } ${!inMonth ? 'opacity-30' : ''}`}
                  >
                    <span className={`text-xs font-display font-700 w-6 h-6 flex items-center justify-center rounded-full ${
                      isTodayDay && isSelected
                        ? 'bg-gradient-accent text-white'
                        : isTodayDay
                        ? 'text-cyan-300'
                        : isSelected
                        ? 'text-indigo-200'
                        : isWeekend && inMonth
                        ? 'text-indigo-300/70'
                        : 'text-slate-300'
                    }`}>
                      {format(day, 'd')}
                    </span>

                    {/* Event dots */}
                    <div className="flex gap-0.5 flex-wrap justify-center">
                      {dayEvents.slice(0, 3).map(ev => (
                        <span key={ev.id} className={`w-1.5 h-1.5 rounded-full ${ev.color}`} />
                      ))}
                      {dayEvents.length > 3 && (
                        <span className="text-[9px] text-slate-500 font-600">+{dayEvents.length - 3}</span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Sidebar: selected day events ─────── */}
          <div className="space-y-4">
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-display font-600 text-xs text-slate-500">
                    {isToday(selectedDate) ? 'TODAY' : format(selectedDate, 'EEEE').toUpperCase()}
                  </p>
                  <p className="font-display font-800 text-2xl text-white">
                    {format(selectedDate, 'MMM d')}
                  </p>
                </div>
                <button
                  onClick={() => setAdding(v => !v)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                    adding
                      ? 'bg-rose-400/10 text-rose-400'
                      : 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30'
                  }`}
                >
                  {adding ? <X size={14} /> : <Plus size={14} />}
                </button>
              </div>

              {/* Add event form */}
              {adding && (
                <div className="space-y-2 mb-4 animate-slide-up">
                  <input
                    className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-400/40 transition"
                    placeholder="Event title…"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addEvent()}
                    autoFocus
                  />
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5 flex-1">
                      {EVENT_COLORS.map(c => (
                        <button
                          key={c}
                          onClick={() => setNewColor(c)}
                          className={`w-5 h-5 rounded-full ${c} transition-all ${
                            newColor === c ? 'scale-125 ring-2 ring-white/30' : 'opacity-50 hover:opacity-100'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={addEvent}
                      className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 font-display font-600 hover:bg-indigo-500/30 transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              {/* Events list */}
              <div className="space-y-2">
                {selectedEvents.length === 0 ? (
                  <p className="text-slate-600 text-sm text-center py-4">
                    No events. Click + to add one.
                  </p>
                ) : (
                  selectedEvents.map(ev => (
                    <div key={ev.id} className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ev.color}`} />
                      <span className="text-sm text-slate-200 flex-1">{ev.title}</span>
                      <button
                        onClick={() => deleteEvent(ev.id)}
                        className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-rose-400 transition-all"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Upcoming events */}
            <div className="glass-card p-5">
              <h3 className="font-display font-700 text-sm text-white mb-3">All Events</h3>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {events.length === 0 ? (
                  <p className="text-xs text-slate-600 text-center py-4">No events yet.</p>
                ) : (
                  events
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .map(ev => (
                      <div key={ev.id} className="group flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${ev.color}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-300 truncate">{ev.title}</p>
                          <p className="text-[10px] text-slate-600">{format(new Date(ev.date), 'MMM d, yyyy')}</p>
                        </div>
                        <button
                          onClick={() => deleteEvent(ev.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-rose-400 transition-all flex-shrink-0"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
