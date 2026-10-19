import { createContext, useContext, useState, useCallback, useMemo } from "react"

// ── Encàrrec ──────────────────────────────────────────────────────
// Serveis que el visitant marca a la secció de serveis. El formulari
// de contacte els llegeix per omplir el missatge.

const OrderContext = createContext({ selected: [], toggle: () => {}, has: () => false })

export function OrderProvider({ children }) {
  const [selected, setSelected] = useState([])

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
