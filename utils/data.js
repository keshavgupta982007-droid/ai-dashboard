// ─── Mock Data ───────────────────────────────────────────────────────────────

export const INITIAL_TASKS = [
  { id: '1', text: 'Finish project report', completed: true, priority: 'high', createdAt: Date.now() - 86400000 },
  { id: '2', text: 'Call with Mark at 2 PM', completed: false, priority: 'high', createdAt: Date.now() - 3600000 },
  { id: '3', text: 'Buy groceries', completed: false, priority: 'low', createdAt: Date.now() },
  { id: '4', text: 'Review pull requests', completed: false, priority: 'medium', createdAt: Date.now() },
]

export const INITIAL_NOTES = [
  { id: '1', title: 'Ideas for new blog post', content: 'Write about AI productivity tools and how they change workflows.', color: 'indigo', createdAt: Date.now() - 86400000 },
  { id: '2', title: 'Meeting agenda for tomorrow', content: '1. Q1 review\n2. Product roadmap\n3. Budget discussion', color: 'cyan', createdAt: Date.now() - 7200000 },
  { id: '3', title: 'Book flight for vacation', content: 'Check flights to Bali — first week of June. Budget: $800.', color: 'violet', createdAt: Date.now() },
]

export const INITIAL_REMINDERS = [
  { id: '1', text: "Doctor's Appointment", time: '4:00 PM', icon: '🏥', done: false },
  { id: '2', text: 'Team standup', time: '10:00 AM', icon: '💼', done: true },
  { id: '3', text: 'Pay electricity bill', time: '6:00 PM', icon: '⚡', done: false },
]

export const WEATHER_DATA = {
  temp: 22,
  condition: 'Sunny',
  humidity: 58,
  wind: 12,
  icon: '☀️',
  forecast: [
    { day: 'Wed', icon: '⛅', high: 24, low: 18 },
    { day: 'Thu', icon: '🌧️', high: 19, low: 15 },
    { day: 'Fri', icon: '☀️', high: 26, low: 19 },
    { day: 'Sat', icon: '☀️', high: 28, low: 20 },
  ],
}

export const DAILY_QUOTES = [
  { text: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt' },
  { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { text: 'It always seems impossible until it\'s done.', author: 'Nelson Mandela' },
  { text: 'Don\'t watch the clock; do what it does. Keep going.', author: 'Sam Levenson' },
  { text: 'You are never too old to set another goal or dream a new dream.', author: 'C.S. Lewis' },
  { text: 'The future depends on what you do today.', author: 'Mahatma Gandhi' },
  { text: 'Success is not final, failure is not fatal: keep going.', author: 'Winston Churchill' },
]

// ─── AI Suggestion Logic ──────────────────────────────────────────────────────

export function getAISuggestion(tasks, notes) {
  const pendingTasks = tasks.filter(t => !t.completed)
  const completedTasks = tasks.filter(t => t.completed)
  const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0
  const highPriority = pendingTasks.filter(t => t.priority === 'high')

  if (tasks.length === 0) {
    return { type: 'info', message: 'Start your day by adding your first task. Small steps lead to big wins! 🚀' }
  }
  if (pendingTasks.length === 0) {
    return { type: 'success', message: 'All tasks complete! You\'re crushing it today. 🎉 Time to set new goals.' }
  }
  if (highPriority.length >= 2) {
    return { type: 'warning', message: `You have ${highPriority.length} high-priority tasks. Tackle "${highPriority[0].text}" first to stay on top.` }
  }
  if (pendingTasks.length > 5) {
    return { type: 'warning', message: `${pendingTasks.length} tasks pending. Consider delegating or deferring low-priority items.` }
  }
  if (completionRate >= 70) {
    return { type: 'success', message: `Great momentum! ${Math.round(completionRate)}% done. Keep pushing — you're close to finishing.` }
  }
  if (notes.length === 0) {
    return { type: 'info', message: 'Capture your ideas in Notes before they slip away. Great thoughts deserve a home! 💡' }
  }
  return { type: 'info', message: `You have ${pendingTasks.length} tasks remaining today. You\'ve got this! 💪` }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function generateId() {
  return Math.random().toString(36).slice(2, 11)
}

export const NOTE_COLORS = {
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', dot: 'bg-indigo-400', tag: 'text-indigo-300' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', dot: 'bg-cyan-400', tag: 'text-cyan-300' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', dot: 'bg-violet-400', tag: 'text-violet-300' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', dot: 'bg-amber-400', tag: 'text-amber-300' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', dot: 'bg-rose-400', tag: 'text-rose-300' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', dot: 'bg-emerald-400', tag: 'text-emerald-300' },
}

export const PRIORITY_CONFIG = {
  high: { label: 'High', color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/20' },
  medium: { label: 'Medium', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
  low: { label: 'Low', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
}
