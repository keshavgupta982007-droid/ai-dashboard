import { useState } from 'react'
import { Trash2, Flag } from 'lucide-react'
import { PRIORITY_CONFIG } from '../utils/data'

/**
 * Individual task item with toggle, delete, and priority badge.
 */
export default function TaskCard({ task, onToggle, onDelete }) {
  const [hovered, setHovered] = useState(false)
  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.low

  return (
    <div
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
        hovered ? 'bg-white/[0.04]' : ''
      } ${task.completed ? 'opacity-60' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {/* Task text */}
      <span
        className={`flex-1 text-sm font-body transition-all duration-200 ${
          task.completed
            ? 'line-through text-slate-500'
            : 'text-slate-200'
        }`}
      >
        {task.text}
      </span>

      {/* Priority badge */}
      <span
        className={`hidden sm:inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-display font-600 ${priority.bg} ${priority.color} ${priority.border}`}
      >
        <Flag size={10} />
        {priority.label}
      </span>

      {/* Delete button — appears on hover */}
      <button
        onClick={() => onDelete(task.id)}
        className={`transition-all duration-200 text-slate-600 hover:text-rose-400 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
        title="Delete task"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
