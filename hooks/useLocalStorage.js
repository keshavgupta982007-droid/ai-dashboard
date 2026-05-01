import { useState, useEffect } from 'react'

/**
 * Custom hook for persistent state via localStorage.
 * Falls back gracefully if localStorage is unavailable.
 */
export function useLocalStorage(key, initialValue) {
  // Read from localStorage on first render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`useLocalStorage: error reading key "${key}"`, error)
      return initialValue
    }
  })

  // Write to localStorage whenever value changes
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`useLocalStorage: error writing key "${key}"`, error)
    }
  }

  return [storedValue, setValue]
}
