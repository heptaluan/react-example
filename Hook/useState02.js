import React, { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>{count}</p>
      <button onClick={_ => setCount(0)}>重置</button>
      <button onClick={() => setCount(prev => prev + 1)}>增加</button>
      <button onClick={() => setCount(prev => prev - 1)}>减少</button>
    </div>
  )
}