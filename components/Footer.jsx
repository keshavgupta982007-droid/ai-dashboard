import { Zap, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
return (
    <footer className="border-t border-white/[0.08] mt-16 bg-navy-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Zap size={15} className="text-white" fill="white" />
            </div>
            <span className="font-display font-700 text-sm text-white">
              Productive<span className="gradient-text">AI</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {['About', 'Contact', 'Privacy', 'Terms'].map(link => (
              <a
                key={link}
                href="#"
                className="text-sm text-slate-500 hover:text-slate-200 font-display font-600 transition-all hover:scale-105"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { Icon: Github, label: 'GitHub' },
              { Icon: Twitter, label: 'Twitter' },
              { Icon: Linkedin, label: 'LinkedIn' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                title={label}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.1] transition-all hover:scale-105 ring-1 ring-white/5"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} ProductiveAI. Built with React + Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
