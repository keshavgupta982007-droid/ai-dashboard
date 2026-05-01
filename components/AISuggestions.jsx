import { Sparkles, AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import { getAISuggestion } from '../utils/data'

/**
 * AI suggestion banner — updates dynamically based on task/note state.
 */
export default function AISuggestions({ tasks, notes }) {
  const suggestion = getAISuggestion(tasks, notes)

  const config = {
    success: {
      Icon: CheckCircle2,
      gradient: 'from-emerald-500/15 to-cyan-500/15',
      border: 'border-emerald-500/20',
      iconColor: 'text-emerald-400',
      badge: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    },
    warning: {
      Icon: AlertTriangle,
      gradient: 'from-amber-500/15 to-orange-500/15',
      border: 'border-amber-500/20',
      iconColor: 'text-amber-400',
      badge: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
    },
    info: {
      Icon: Info,
      gradient: 'from-indigo-500/15 to-cyan-500/15',
      border: 'border-indigo-500/20',
      iconColor: 'text-indigo-400',
      badge: 'bg-indigo-400/10 text-indigo-400 border-indigo-400/20',
    },
  }

  const { Icon, gradient, border, iconColor, badge } = config[suggestion.type]
  const pendingCount = tasks.filter(t => !t.completed).length

  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r ${gradient} border ${border} transition-all duration-500`}>
      {/* Background glow */}
      <div className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.15), transparent 70%)' }}
      />

      <div className="relative flex items-start gap-4">
        {/* AI icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow">
          <Sparkles size={18} className="text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-display font-700 text-sm text-white">AI Insight</span>
            <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-display font-600 ${badge}`}>
              <Icon size={10} />
              {suggestion.type}
            </span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{suggestion.message}</p>
        </div>

        {/* Stats pills */}
        <div className="hidden sm:flex flex-col gap-2 items-end flex-shrink-0">
          <div className="text-xs text-slate-500 font-display font-600">
            <span className="text-white font-700">{pendingCount}</span> pending
          </div>
          <div className="text-xs text-slate-500 font-display font-600">
            <span className="text-white font-700">{notes.length}</span> notes
          </div>
        </div>
      </div>
    </div>
  )
}
