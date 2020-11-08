import React, { useReducer } from 'react';

const myReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        count: state.count + 1
      }
    case 'dec':
      return {
        ...state,
        count: state.count - 1
      }
    case 'reset':
      return {
        ...state,
        count: action.payload || 0
      }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(myReducer, { count: 10 })
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={_ => dispatch({ type: 'reset' })}>重置</button>
      <button onClick={_ => dispatch({ type: 'add' })}>增加</button>
      <button onClick={_ => dispatch({ type: 'dec' })}>减少</button>
    </div>
  )
}