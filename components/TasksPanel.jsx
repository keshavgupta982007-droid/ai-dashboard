import { useState } from 'react'
import { Plus, CheckSquare, Flag } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { INITIAL_TASKS, generateId } from '../utils/data'
import TaskCard from './TaskCard'

/**
 * Full-featured tasks panel with add, toggle, delete, and priority filter.
 */
export default function TasksPanel() {
  const [tasks, setTasks] = useLocalStorage('ai-tasks', INITIAL_TASKS)
  const [newTask, setNewTask] = useState('')
  const [priority, setPriority] = useState('medium')
  const [filter, setFilter] = useState('all') // all | active | done

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks(t => [
      {
        id: generateId(),
        text: newTask.trim(),
        completed: false,
        priority,
        createdAt: Date.now(),
      },
      ...t,
    ])
    setNewTask('')
  }

  const toggleTask = (id) => {
    setTasks(t => t.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  const deleteTask = (id) => {
    setTasks(t => t.filter(task => task.id !== id))
  }

  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'done') return t.completed
    return true
  })

  const completedCount = tasks.filter(t => t.completed).length
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0

  const PRIORITY_OPTIONS = [
    { value: 'high', label: 'High', color: 'text-rose-400' },
    { value: 'medium', label: 'Medium', color: 'text-amber-400' },
    { value: 'low', label: 'Low', color: 'text-emerald-400' },
  ]

  const FILTERS = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'done', label: 'Done' },
  ]

  return (
    <div className="glass-card p-5 flex flex-col gap-4 h-full">
      {/* Panel header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <CheckSquare size={14} className="text-indigo-400" />
          </div>
          <h3 className="font-display font-700 text-sm text-white">To-Do List</h3>
        </div>
        <span className="text-xs text-slate-500 font-display font-600">
          {completedCount}/{tasks.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-accent transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Add task input */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            className="flex-1 bg-white/[0.06] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-400/40 transition"
            placeholder="Add a new task…"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
          />
          <button
            onClick={addTask}
            className="w-9 h-9 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 flex items-center justify-center transition-all hover:scale-105"
            title="Add task"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Priority selector */}
        <div className="flex gap-1.5">
          <Flag size={11} className="text-slate-600 mt-0.5 flex-shrink-0" />
          {PRIORITY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setPriority(opt.value)}
              className={`text-xs px-2.5 py-1 rounded-lg font-display font-600 transition-all ${
                priority === opt.value
                  ? `${opt.color} bg-white/[0.08]`
                  : 'text-slate-600 hover:text-slate-400'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-white/[0.04] rounded-xl p-1">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`flex-1 text-xs py-1.5 rounded-lg font-display font-600 transition-all ${
              filter === f.value
                ? 'bg-white/[0.08] text-white'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="flex-1 overflow-y-auto space-y-0.5 min-h-0 max-h-64 pr-1">
        {filtered.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-600 text-sm">
              {filter === 'done' ? 'No completed tasks yet.' : 'No tasks here. Add one above!'}
            </p>
          </div>
        ) : (
          filtered.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  )
}
