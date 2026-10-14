import { useCallback, useEffect, useState } from 'react'

function resolveInitial(initialValue) {
  return typeof initialValue === 'function' ? initialValue() : initialValue
}

export function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw == null) {
        return resolveInitial(initialValue)
      }
      return JSON.parse(raw)
    } catch {
      return resolveInitial(initialValue)
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState(readValue)

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const next = typeof value === 'function' ? value(prev) : value
        localStorage.setItem(key, JSON.stringify(next))
        return next
      })
    },
    [key],
  )

  const syncFromStorage = useCallback(() => {
    setStoredValue(readValue())
  }, [readValue])

  useEffect(() => {
    function onStorage(event) {
      if (event.key !== key || event.storageArea !== localStorage) return
      if (event.newValue == null) {
        setStoredValue(resolveInitial(initialValue))
        return
      }
      try {
        setStoredValue(JSON.parse(event.newValue))
      } catch {
        setStoredValue(resolveInitial(initialValue))
      }
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key, initialValue])

  return [storedValue, setValue, syncFromStorage]
}
