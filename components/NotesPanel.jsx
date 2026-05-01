import { useState } from 'react'
import { Plus, FileText, X } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { INITIAL_NOTES, generateId, NOTE_COLORS } from '../utils/data'
import NoteCard from './NoteCard'

const COLOR_OPTIONS = Object.keys(NOTE_COLORS)

/**
 * Notes panel with add-new modal/inline form and editable note cards.
 */
export default function NotesPanel() {
  const [notes, setNotes] = useLocalStorage('ai-notes', INITIAL_NOTES)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState({ title: '', content: '', color: 'indigo' })

  const saveNote = () => {
    if (!draft.title.trim()) return
    setNotes(n => [
      { id: generateId(), ...draft, createdAt: Date.now() },
      ...n,
    ])
    setDraft({ title: '', content: '', color: 'indigo' })
    setAdding(false)
  }

  const updateNote = (id, changes) => {
    setNotes(n => n.map(note => note.id === id ? { ...note, ...changes } : note))
  }

  const deleteNote = (id) => {
    setNotes(n => n.filter(note => note.id !== id))
  }

  return (
    <div className="glass-card p-5 flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <FileText size={14} className="text-cyan-400" />
          </div>
          <h3 className="font-display font-700 text-sm text-white">Quick Notes</h3>
        </div>
        <button
          onClick={() => setAdding(v => !v)}
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
            adding
              ? 'bg-rose-400/10 text-rose-400 hover:bg-rose-400/20'
              : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
          }`}
        >
          {adding ? <X size={14} /> : <Plus size={14} />}
        </button>
      </div>

      {/* Add note form */}
      {adding && (
        <div className="space-y-2 bg-white/[0.04] rounded-xl p-3 border border-white/[0.08] animate-slide-up">
          <input
            className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-sm font-display font-600 text-white placeholder-slate-600 outline-none focus:border-cyan-400/40 transition"
            placeholder="Note title…"
            value={draft.title}
            onChange={e => setDraft(d => ({ ...d, title: e.target.value }))}
            autoFocus
          />
          <textarea
            className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-300 placeholder-slate-600 outline-none focus:border-cyan-400/40 transition resize-none"
            placeholder="Write your note…"
            rows={3}
            value={draft.content}
            onChange={e => setDraft(d => ({ ...d, content: e.target.value }))}
          />

          {/* Color picker */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">Color:</span>
            <div className="flex gap-1.5">
              {COLOR_OPTIONS.map(color => (
                <button
                  key={color}
                  onClick={() => setDraft(d => ({ ...d, color }))}
                  className={`w-4 h-4 rounded-full ${NOTE_COLORS[color].dot} transition-all ${
                    draft.color === color ? 'scale-125 ring-1 ring-white/30' : 'opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={saveNote}
              className="ml-auto text-xs px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 font-display font-600 hover:bg-cyan-500/30 transition"
            >
              Save note
            </button>
          </div>
        </div>
      )}

      {/* Notes grid */}
      <div className="flex-1 overflow-y-auto space-y-2.5 min-h-0 max-h-[300px] pr-1">
        {notes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-600 text-sm">No notes yet. Create your first note!</p>
          </div>
        ) : (
          notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onUpdate={updateNote}
              onDelete={deleteNote}
            />
          ))
        )}
      </div>
    </div>
  )
}
