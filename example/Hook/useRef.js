import React, { useState, useEffect, useRef } from 'react'

const App = _ => {

  const [count, setCount] = useState(0)
  const countRef = useRef(0)

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(countRef.current)
      setCount(++countRef.current)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      { count }
    </div>
  )
}

export default App