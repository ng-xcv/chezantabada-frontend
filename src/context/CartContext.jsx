import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i._id === action.product._id)
      if (exists) {
        return state.map(i =>
          i._id === action.product._id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...state, { ...action.product, qty: 1 }]
    }
    case 'REMOVE':
      return state.filter(i => i._id !== action.id)
    case 'UPDATE_QTY':
      return state.map(i => i._id === action.id ? { ...i, qty: action.qty } : i)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(
    cartReducer,
    [],
    () => {
      try {
        return JSON.parse(localStorage.getItem('cab_cart') || '[]')
      } catch {
        return []
      }
    }
  )

  useEffect(() => {
    localStorage.setItem('cab_cart', JSON.stringify(items))
  }, [items])

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{
      items, total, count,
      add:       (product) => dispatch({ type: 'ADD', product }),
      remove:    (id)      => dispatch({ type: 'REMOVE', id }),
      updateQty: (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty }),
      clear:     ()        => dispatch({ type: 'CLEAR' }),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
