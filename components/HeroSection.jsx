import { ArrowRight, Play, Sparkles, CheckCircle2, Zap, Brain } from 'lucide-react'

/**
 * Hero section with animated gradient background, headline, CTA buttons,
 * and floating feature pills.
 */
export default function HeroSection({ onGetStarted }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
{/* ── Animated background mesh ──────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main gradient blobs - enhanced */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/25 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[80px] animate-pulse-slow delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[90px]" />
        
        {/* Additional glow points */}
        <div className="absolute top-[15%] right-[20%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[60px] animate-pulse-slow delay-500" />
        <div className="absolute bottom-[20%] left-[10%] w-[250px] h-[250px] bg-cyan-400/8 rounded-full blur-[50px] animate-pulse-slow delay-700" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,8,24,0.8)_100%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
{/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-400/25 bg-indigo-400/15 text-indigo-300 text-xs font-display font-600 mb-8 animate-fade-in hover:scale-105 transition-transform cursor-default">
          <Sparkles size={12} className="animate-pulse-slow" />
          AI-Powered Productivity Dashboard
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse ring-2 ring-navy-950" />
        </div>

        {/* Headline */}
        <h1 className="font-display font-800 text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white mb-6 animate-slide-up delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
          Organize Your Life
          <br />
          <span className="gradient-text">with AI Power</span>
        </h1>

        {/* Subheading */}
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-body animate-slide-up delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
          Tasks, notes, and schedules — all in one beautifully designed smart dashboard
          that understands how you work.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-slide-up delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
          <button
            onClick={onGetStarted}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            Get Started
            <ArrowRight size={15} />
          </button>
          <button className="btn-ghost flex items-center gap-2 text-sm">
            <Play size={14} fill="currentColor" />
            View Demo
          </button>
        </div>

{/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 animate-fade-in delay-500 opacity-0" style={{ animationFillMode: 'forwards' }}>
          {[
            { Icon: CheckCircle2, label: 'Smart Task Management', color: 'text-emerald-400' },
            { Icon: Brain, label: 'AI Suggestions', color: 'text-indigo-400' },
            { Icon: Zap, label: 'Real-time Updates', color: 'text-amber-400' },
          ].map(({ Icon, label, color }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-sm font-display font-600 text-slate-300 hover:text-white transition-all hover:scale-105 cursor-default border border-white/[0.06] hover:border-white/[0.12]"
            >
              <Icon size={14} className={color} />
              {label}
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <span className="text-xs text-slate-600 font-display font-600">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
        </div>
      </div>
    </section>
  )
}
