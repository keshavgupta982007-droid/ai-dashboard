import { useState } from 'react'
import { Bell, Plus, Trash2, Check } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { INITIAL_REMINDERS, generateId } from '../utils/data'

export default function ReminderWidget() {
  const [reminders, setReminders] = useLocalStorage('ai-reminders', INITIAL_REMINDERS)
  const [adding, setAdding] = useState(false)
  const [newText, setNewText] = useState('')
  const [newTime, setNewTime] = useState('09:00')

  const addReminder = () => {
    if (!newText.trim()) return
    setReminders(r => [
      ...r,
      { id: generateId(), text: newText.trim(), time: newTime, icon: '🔔', done: false },
    ])
    setNewText('')
    setNewTime('09:00')
    setAdding(false)
  }

  const toggleDone = (id) => {
    setReminders(r => r.map(rem => rem.id === id ? { ...rem, done: !rem.done } : rem))
  }

  const deleteReminder = (id) => {
    setReminders(r => r.filter(rem => rem.id !== id))
  }

  return (
    <div className="space-y-2">
      {reminders.length === 0 && (
        <p className="text-xs text-slate-500 text-center py-2">No reminders yet</p>
      )}

      {reminders.map(rem => (
        <div
          key={rem.id}
          className={`group flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all duration-200 ${
            rem.done ? 'opacity-50' : 'hover:bg-white/[0.04]'
          }`}
        >
          <button
            onClick={() => toggleDone(rem.id)}
            className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
              rem.done
                ? 'bg-emerald-400/20 border-emerald-400/40 text-emerald-400'
                : 'border-slate-600 hover:border-indigo-400'
            }`}
          >
            {rem.done && <Check size={10} />}
          </button>

          <span className="text-sm flex-1">
            <span className={rem.done ? 'line-through text-slate-500' : 'text-slate-200'}>{rem.text}</span>
            <span className="text-xs text-indigo-400 ml-1.5 font-display font-600">{rem.time}</span>
          </span>

          <button
            onClick={() => deleteReminder(rem.id)}
            className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-rose-400 transition-all"
          >
            <Trash2 size={12} />
          </button>
        </div>
      ))}

      {/* Add form */}
      {adding ? (
        <div className="space-y-2 pt-2 border-t border-white/[0.06]">
          <input
            className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-400/50 transition"
            placeholder="Reminder text…"
            value={newText}
            onChange={e => setNewText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addReminder()}
            autoFocus
          />
          <div className="flex gap-2">
            <input
              type="time"
              className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-300 outline-none focus:border-indigo-400/50 transition"
              value={newTime}
              onChange={e => setNewTime(e.target.value)}
            />
            <button
              onClick={addReminder}
              className="px-3 py-2 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-display font-600 hover:bg-indigo-500/30 transition"
            >
              Add
            </button>
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-2 rounded-xl bg-white/[0.04] text-slate-400 text-xs font-display font-600 hover:bg-white/[0.08] transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 w-full px-2.5 py-2 rounded-xl text-xs text-slate-500 hover:text-indigo-400 hover:bg-white/[0.04] transition-all font-display font-600"
        >
          <Plus size={13} />
          Add reminder
        </button>
      )}
    </div>
  )
}
