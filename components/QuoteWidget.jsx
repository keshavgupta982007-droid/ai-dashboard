import { useState } from 'react'
import { Quote, RefreshCw } from 'lucide-react'
import { DAILY_QUOTES } from '../utils/data'

/**
 * Daily motivational quote with refresh button.
 */
export default function QuoteWidget() {
  const todayIdx = new Date().getDay() % DAILY_QUOTES.length
  const [idx, setIdx] = useState(todayIdx)

  const quote = DAILY_QUOTES[idx]

  const nextQuote = () => {
    setIdx(i => (i + 1) % DAILY_QUOTES.length)
  }

  return (
    <div className="relative">
      {/* Large decorative quote mark */}
      <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-3">
  <Quote size={16} className="text-indigo-400" fill="currentColor" />
</div>

<div className="space-y-3">
        <p className="text-slate-200 font-body text-sm leading-relaxed italic">
          "{quote.text}"
        </p>
        <p className="text-indigo-400 font-display font-600 text-xs">
          — {quote.author}
        </p>
      </div>

      <button
        onClick={nextQuote}
        className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition-colors group"
        title="Next quote"
      >
        <RefreshCw size={11} className="group-hover:rotate-180 transition-transform duration-500" />
        Next quote
      </button>
    </div>
  )
}
