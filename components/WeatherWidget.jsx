import { useState, useEffect } from 'react'
import { Wind, Droplets, RefreshCw } from 'lucide-react'

const WMO = {
  0: { label: 'Clear sky', emoji: '☀️' },
  1: { label: 'Mainly clear', emoji: '🌤️' },
  2: { label: 'Partly cloudy', emoji: '⛅' },
  3: { label: 'Overcast', emoji: '☁️' },
  45: { label: 'Foggy', emoji: '🌫️' }, 48: { label: 'Foggy', emoji: '🌫️' },
  51: { label: 'Drizzle', emoji: '🌦️' }, 53: { label: 'Drizzle', emoji: '🌦️' }, 55: { label: 'Drizzle', emoji: '🌦️' },
  61: { label: 'Rainy', emoji: '🌧️' }, 63: { label: 'Rainy', emoji: '🌧️' }, 65: { label: 'Heavy rain', emoji: '🌧️' },
  71: { label: 'Snow', emoji: '❄️' }, 73: { label: 'Snow', emoji: '❄️' }, 75: { label: 'Heavy snow', emoji: '❄️' },
  80: { label: 'Showers', emoji: '🌦️' }, 81: { label: 'Showers', emoji: '🌦️' }, 82: { label: 'Heavy showers', emoji: '⛈️' },
  95: { label: 'Thunderstorm', emoji: '⛈️' }, 96: { label: 'Thunderstorm', emoji: '⛈️' }, 99: { label: 'Thunderstorm', emoji: '⛈️' },
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchWeather = async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=28.4595&longitude=77.0266' +
        '&current=temperature_2m,weathercode,windspeed_10m,relative_humidity_2m' +
        '&daily=weathercode,temperature_2m_max,temperature_2m_min' +
        '&timezone=Asia%2FKolkata&forecast_days=5'
      )
      const data = await res.json()
      const c = data.current
      const wmo = WMO[c.weathercode] || { label: 'Unknown', emoji: '🌡️' }

      const forecast = data.daily.time.slice(1, 5).map((t, i) => {
        const dt = new Date(t + 'T12:00:00')
        const fw = WMO[data.daily.weathercode[i + 1]] || { emoji: '🌡️' }
        return {
          day: DAYS[dt.getDay()],
          emoji: fw.emoji,
          hi: Math.round(data.daily.temperature_2m_max[i + 1]),
          lo: Math.round(data.daily.temperature_2m_min[i + 1]),
        }
      })

      setWeather({
        temp: Math.round(c.temperature_2m),
        condition: wmo.label,
        emoji: wmo.emoji,
        humidity: c.relative_humidity_2m,
        wind: Math.round(c.windspeed_10m),
        forecast,
      })
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchWeather() }, [])

  if (loading) return (
    <div className="text-center py-6 text-slate-500 text-sm">Fetching live weather…</div>
  )

  if (error) return (
    <div className="text-center py-4">
      <p className="text-rose-400 text-sm mb-3">Could not load weather.</p>
      <button onClick={fetchWeather} className="text-xs text-indigo-400 hover:underline">Try again</button>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Main */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-end gap-2">
            <span className="font-display font-800 text-4xl text-white">{weather.temp}°</span>
            <span className="text-slate-400 text-sm mb-1">C</span>
          </div>
          <p className="text-slate-300 font-display font-600 text-sm">{weather.condition}</p>
          <p className="text-slate-500 text-xs mt-0.5">Gurugram, Haryana IN</p>
        </div>
        <span className="text-5xl animate-float">{weather.emoji}</span>
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Droplets size={12} className="text-cyan-400" />
          {weather.humidity}%
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Wind size={12} className="text-cyan-400" />
          {weather.wind} km/h
        </div>
        <button onClick={fetchWeather} className="ml-auto flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-400 transition-colors">
          <RefreshCw size={10} /> Refresh
        </button>
      </div>

      {/* Forecast */}
      <div className="flex justify-between pt-3 border-t border-white/[0.06]">
        {weather.forecast.map(day => (
          <div key={day.day} className="flex flex-col items-center gap-1">
            <span className="text-xs text-slate-500 font-display font-600">{day.day}</span>
            <span className="text-base">{day.emoji}</span>
            <span className="text-xs text-white font-600">{day.hi}°</span>
            <span className="text-xs text-slate-500">{day.lo}°</span>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-slate-700 text-right">Live · Open-Meteo API</p>
    </div>
  )
}