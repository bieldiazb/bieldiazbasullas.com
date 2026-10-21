import { createContext, useContext, useState, useCallback, useMemo } from "react"

// ── Encàrrec ──────────────────────────────────────────────────────
// Serveis que el visitant marca a la secció de serveis. El formulari
// de contacte els llegeix per omplir el missatge.

const OrderContext = createContext({ selected: [], toggle: () => {}, has: () => false })

// Des d'una pàgina de servei, l'enllaç "Parlem" porta ?servei=<id> i el
// formulari arriba amb aquell servei ja marcat
const initialSelection = () => {
  if (typeof window === "undefined") return []
  const id = new URLSearchParams(window.location.search).get("servei")
  return id && /^[a-z-]+$/.test(id) ? [id] : []
}

export function OrderProvider({ children }) {
  const [selected, setSelected] = useState(initialSelection)

  const toggle = useCallback((id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }, [])

  const value = useMemo(() => ({
    selected,
    toggle,
    has: (id) => selected.includes(id),
  }), [selected, toggle])

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOrder = () => useContext(OrderContext)
