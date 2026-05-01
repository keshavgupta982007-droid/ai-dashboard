import { useState } from 'react'
import { Plus, FileText, Search, X } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { INITIAL_NOTES, generateId, NOTE_COLORS } from '../utils/data'
import NoteCard from '../components/NoteCard'

const COLOR_OPTIONS = Object.keys(NOTE_COLORS)

/**
 * Full-page Notes view with search, color filter, and grid layout.
 */
export default function Notes() {
  const [notes, setNotes] = useLocalStorage('ai-notes', INITIAL_NOTES)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState({ title: '', content: '', color: 'indigo' })
  const [search, setSearch] = useState('')
  const [colorFilter, setColorFilter] = useState('all')

  const saveNote = () => {
    if (!draft.title.trim()) return
    setNotes(n => [
      { id: generateId(), ...draft, createdAt: Date.now() },
      ...n,
    ])
    setDraft({ title: '', content: '', color: 'indigo' })
    setAdding(false)
  }

  const updateNote = (id, changes) => setNotes(n => n.map(note => note.id === id ? { ...note, ...changes } : note))
  const deleteNote = id => setNotes(n => n.filter(note => note.id !== id))

  const visible = notes
    .filter(n => colorFilter === 'all' || n.color === colorFilter)
    .filter(n =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Page header */}
        <div className="flex items-start justify-between mb-8 animate-slide-up">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                <FileText size={18} className="text-cyan-400" />
              </div>
              <h1 className="font-display font-800 text-3xl text-white">Notes</h1>
            </div>
            <p className="text-slate-500 text-sm font-body">
              {notes.length} note{notes.length !== 1 ? 's' : ''} saved
            </p>
          </div>
          <button
            onClick={() => setAdding(v => !v)}
            className={`flex items-center gap-2 text-sm font-display font-600 px-4 py-2.5 rounded-xl transition-all ${
              adding
                ? 'bg-rose-400/10 text-rose-400 border border-rose-400/20 hover:bg-rose-400/20'
                : 'btn-primary'
            }`}
          >
            {adding ? <><X size={14} /> Cancel</> : <><Plus size={14} /> New Note</>}
          </button>
        </div>

        {/* Add note form */}
        {adding && (
          <div className="glass-card p-5 mb-6 space-y-3 animate-slide-up">
            <input
              className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-display font-700 text-white placeholder-slate-600 outline-none focus:border-cyan-400/40 transition"
              placeholder="Note title…"
              value={draft.title}
              onChange={e => setDraft(d => ({ ...d, title: e.target.value }))}
              autoFocus
            />
            <textarea
              className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 placeholder-slate-600 outline-none focus:border-cyan-400/40 transition resize-none"
              placeholder="Start writing your note…"
              rows={5}
              value={draft.content}
              onChange={e => setDraft(d => ({ ...d, content: e.target.value }))}
            />
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-slate-600 font-display font-600">Pick color:</span>
              <div className="flex gap-2">
                {COLOR_OPTIONS.map(color => (
                  <button
                    key={color}
                    onClick={() => setDraft(d => ({ ...d, color }))}
                    className={`w-5 h-5 rounded-full ${NOTE_COLORS[color].dot} transition-all ${
                      draft.color === color ? 'scale-125 ring-2 ring-white/30' : 'opacity-50 hover:opacity-100'
                    }`}
                    title={color}
                  />
                ))}
              </div>
              <button
                onClick={saveNote}
                className="ml-auto btn-primary text-sm flex items-center gap-1.5"
              >
                <Plus size={13} /> Save Note
              </button>
            </div>
          </div>
        )}

        {/* Search + color filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
            <input
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-600 outline-none focus:border-cyan-400/30 transition"
              placeholder="Search notes…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-display font-600 whitespace-nowrap">Filter:</span>
            <button
              onClick={() => setColorFilter('all')}
              className={`text-xs px-3 py-2 rounded-xl font-display font-600 transition ${
                colorFilter === 'all' ? 'bg-white/[0.08] text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              All
            </button>
            {COLOR_OPTIONS.map(color => (
              <button
                key={color}
                onClick={() => setColorFilter(color === colorFilter ? 'all' : color)}
                className={`w-6 h-6 rounded-lg ${NOTE_COLORS[color].dot} transition-all ${
                  colorFilter === color ? 'scale-110 ring-2 ring-white/30' : 'opacity-50 hover:opacity-100'
                }`}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Notes grid */}
        {visible.length === 0 ? (
          <div className="glass-card py-20 text-center">
            <FileText size={36} className="text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 text-sm">
              {search ? 'No notes match your search.' : 'No notes yet. Create your first one!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onUpdate={updateNote}
                onDelete={deleteNote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
