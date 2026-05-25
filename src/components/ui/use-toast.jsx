import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
}

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const listeners = []
let memoryState = { toasts: [] }

function dispatch(action) {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      memoryState = {
        toasts: [action.toast, ...memoryState.toasts].slice(0, TOAST_LIMIT),
      }
      break

    case actionTypes.UPDATE_TOAST:
      memoryState = {
        toasts: memoryState.toasts.map(t =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }
      break

    case actionTypes.DISMISS_TOAST:
      memoryState = {
        toasts: memoryState.toasts.map(t =>
          t.id === action.toastId || action.toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      }
      break

    case actionTypes.REMOVE_TOAST:
      memoryState = {
        toasts: action.toastId
          ? memoryState.toasts.filter(t => t.id !== action.toastId)
          : [],
      }
      break
  }

  listeners.forEach(l => l(memoryState))
}

export function toast(props) {
  const id = genId()

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: open => {
        if (!open) dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })
      },
    },
  })

  return {
    id,
    dismiss: () =>
      dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id }),
    update: newProps =>
      dispatch({
        type: actionTypes.UPDATE_TOAST,
        toast: { ...newProps, id },
      }),
  }
}

export function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const i = listeners.indexOf(setState)
      if (i > -1) listeners.splice(i, 1)
    }
  }, [])

  return {
    ...state,
    toast,
    dismiss: toastId =>
      dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  }
}
