import { useState } from 'react'
import { Trash2, Pencil, Check, X } from 'lucide-react'
import { NOTE_COLORS } from '../utils/data'

/**
 * Editable note card with inline edit mode and delete.
 */
export default function NoteCard({ note, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ title: note.title, content: note.content })

  const colors = NOTE_COLORS[note.color] || NOTE_COLORS.indigo

  const save = () => {
    if (draft.title.trim()) {
      onUpdate(note.id, draft)
      setEditing(false)
    }
  }

  const cancel = () => {
    setDraft({ title: note.title, content: note.content })
    setEditing(false)
  }

  return (
    <div className={`group relative rounded-xl p-4 border transition-all duration-300 hover:scale-[1.02] hover:shadow-glass ${colors.bg} ${colors.border}`}>
      {/* Color dot */}
      <span className={`absolute top-4 right-4 w-2 h-2 rounded-full ${colors.dot}`} />

      {editing ? (
        /* ── Edit mode ──────────────────────── */
        <div className="space-y-2">
          <input
            className="w-full bg-white/[0.08] border border-white/10 rounded-lg px-3 py-1.5 text-sm font-display font-600 text-white outline-none focus:border-indigo-400/50"
            value={draft.title}
            onChange={e => setDraft(d => ({ ...d, title: e.target.value }))}
            placeholder="Note title…"
          />
          <textarea
            className="w-full bg-white/[0.08] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-slate-300 outline-none focus:border-indigo-400/50 resize-none"
            rows={3}
            value={draft.content}
            onChange={e => setDraft(d => ({ ...d, content: e.target.value }))}
            placeholder="Note content…"
          />
          <div className="flex gap-2 justify-end">
            <button onClick={cancel} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/[0.08] transition">
              <X size={12} /> Cancel
            </button>
            <button onClick={save} className="flex items-center gap-1 text-xs text-indigo-300 hover:text-white px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 transition">
              <Check size={12} /> Save
            </button>
          </div>
        </div>
      ) : (
        /* ── View mode ──────────────────────── */
        <>
          <h4 className={`font-display font-700 text-sm mb-1 pr-5 ${colors.tag}`}>{note.title}</h4>
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 whitespace-pre-line">{note.content}</p>

          {/* Actions — appear on hover */}
          <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-slate-400 hover:text-white transition"
              title="Edit"
            >
              <Pencil size={11} />
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="p-1.5 rounded-lg bg-rose-400/10 hover:bg-rose-400/20 text-rose-400 transition"
              title="Delete"
            >
              <Trash2 size={11} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
