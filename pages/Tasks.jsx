import { useState } from 'react'
import { Plus, CheckSquare, Flag, Search, Trash2, BarChart3 } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { INITIAL_TASKS, generateId, PRIORITY_CONFIG } from '../utils/data'
import TaskCard from '../components/TaskCard'

/**
 * Full-page Tasks view with search, filter, sort, and bulk operations.
 */
export default function Tasks() {
  const [tasks, setTasks] = useLocalStorage('ai-tasks', INITIAL_TASKS)
  const [newTask, setNewTask] = useState('')
  const [priority, setPriority] = useState('medium')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('newest')

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks(t => [
      { id: generateId(), text: newTask.trim(), completed: false, priority, createdAt: Date.now() },
      ...t,
    ])
    setNewTask('')
  }

  const toggleTask = id => setTasks(t => t.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  const deleteTask = id => setTasks(t => t.filter(task => task.id !== id))
  const clearCompleted = () => setTasks(t => t.filter(task => !task.completed))

  // Filter + search + sort
  const visible = tasks
    .filter(t => {
      if (filter === 'active') return !t.completed
      if (filter === 'done') return t.completed
      if (filter === 'high') return t.priority === 'high'
      return true
    })
    .filter(t => t.text.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'newest') return b.createdAt - a.createdAt
      if (sort === 'oldest') return a.createdAt - b.createdAt
      if (sort === 'priority') {
        const order = { high: 0, medium: 1, low: 2 }
        return order[a.priority] - order[b.priority]
      }
      return 0
    })

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    done: tasks.filter(t => t.completed).length,
    high: tasks.filter(t => t.priority === 'high' && !t.completed).length,
  }

  const PRIORITY_OPTIONS = ['high', 'medium', 'low']
  const FILTERS = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'done', label: 'Done' },
    { value: 'high', label: '🔴 High Priority' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Page header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow">
              <CheckSquare size={18} className="text-white" />
            </div>
            <h1 className="font-display font-800 text-3xl text-white">Tasks</h1>
          </div>
          <p className="text-slate-500 text-sm font-body ml-13">
            Manage and track your to-do items with priority tagging.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total', value: stats.total, color: 'text-white' },
            { label: 'Active', value: stats.active, color: 'text-amber-400' },
            { label: 'Done', value: stats.done, color: 'text-emerald-400' },
            { label: 'High Pri', value: stats.high, color: 'text-rose-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="glass-card p-3 text-center">
              <p className={`font-display font-800 text-xl ${color}`}>{value}</p>
              <p className="text-xs text-slate-600 font-display font-600 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Add task */}
        <div className="glass-card p-4 mb-6 space-y-3">
          <div className="flex gap-2">
            <input
              className="flex-1 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-400/40 transition"
              placeholder="What needs to be done?"
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
            />
            <button
              onClick={addTask}
              className="btn-primary flex items-center gap-1.5 text-sm"
            >
              <Plus size={15} />
              Add
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Flag size={12} className="text-slate-600" />
            <span className="text-xs text-slate-600 font-display font-600">Priority:</span>
            {PRIORITY_OPTIONS.map(p => {
              const cfg = PRIORITY_CONFIG[p]
              return (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`text-xs px-3 py-1 rounded-lg font-display font-600 border transition-all ${
                    priority === p
                      ? `${cfg.color} ${cfg.bg} ${cfg.border}`
                      : 'text-slate-600 border-transparent hover:text-slate-400'
                  }`}
                >
                  {cfg.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Filters + search + sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
            <input
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-600 outline-none focus:border-indigo-400/30 transition"
              placeholder="Search tasks…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {/* Sort */}
          <select
            className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2 text-sm text-slate-400 outline-none cursor-pointer"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="priority">By priority</option>
          </select>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 bg-white/[0.04] rounded-xl p-1 mb-4">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`flex-1 text-xs py-2 rounded-lg font-display font-600 transition-all ${
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
        <div className="glass-card divide-y divide-white/[0.04] overflow-hidden">
          {visible.length === 0 ? (
            <div className="py-16 text-center">
              <CheckSquare size={32} className="text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">No tasks match your filter.</p>
            </div>
          ) : (
            visible.map(task => (
              <div key={task.id} className="px-2 py-1">
                <TaskCard task={task} onToggle={toggleTask} onDelete={deleteTask} />
              </div>
            ))
          )}
        </div>

        {/* Clear completed */}
        {stats.done > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearCompleted}
              className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-rose-400 transition-colors font-display font-600"
            >
              <Trash2 size={12} />
              Clear {stats.done} completed
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
