import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isToday, addMonths, subMonths } from 'date-fns'

/**
 * A minimal interactive calendar widget.
 * Shows the current month with today highlighted and allows month navigation.
 */
export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Leading empty cells (Monday-based: Mon=0 … Sun=6)
  const startDow = (getDay(monthStart) + 6) % 7 // shift so Monday=0
  const blanks = Array.from({ length: startDow })

  const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentDate(d => subMonths(d, 1))}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/[0.08] text-slate-400 hover:text-white transition"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="font-display font-700 text-sm text-slate-200">
          {format(currentDate, 'MMMM yyyy')}
        </span>
        <button
          onClick={() => setCurrentDate(d => addMonths(d, 1))}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/[0.08] text-slate-400 hover:text-white transition"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-xs font-display font-600 text-slate-500">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {blanks.map((_, i) => <div key={`blank-${i}`} />)}
        {days.map(day => {
          const isSelected = isSameDay(day, selectedDate)
          const isTodayDay = isToday(day)
          const isWeekend = [0, 6].includes(getDay(day))

          return (
            <button
              key={day.toString()}
              onClick={() => setSelectedDate(day)}
              className={`relative mx-auto flex items-center justify-center w-7 h-7 rounded-lg text-xs font-display font-600 transition-all duration-150 ${
                isSelected && isTodayDay
                  ? 'bg-gradient-accent text-white shadow-glow scale-110'
                  : isSelected
                  ? 'bg-indigo-500/30 text-indigo-200 ring-1 ring-indigo-400/40'
                  : isTodayDay
                  ? 'bg-cyan-400/20 text-cyan-300 ring-1 ring-cyan-400/30'
                  : isWeekend
                  ? 'text-indigo-300/60 hover:bg-white/[0.06]'
                  : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>

      {/* Selected date display */}
      <div className="mt-4 pt-3 border-t border-white/[0.06]">
        <p className="text-xs text-slate-500 text-center">
          {isSameDay(selectedDate, new Date())
            ? '📅 Today'
            : format(selectedDate, 'EEEE, MMMM d')}
        </p>
      </div>
    </div>
  )
}
