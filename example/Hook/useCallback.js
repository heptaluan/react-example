import React, { useState, useCallback, useMemo } from 'react'

const Child = ({ onChange }) => {
  return useMemo(() => {
    console.log(`子组件渲染`)
    return <div>
      <input type="text" onChange={onChange} />
    </div>
  }, [onChange])
}

const App = () => {
  const [count, setCount] = useState(0)
  const onChange = useCallback(e => {
    setCount(e.target.value)
  }, [])
  return (<div>
    <div>{count}</div>
    <button onClick={() => setCount(count + 1)}>update count</button>
    <Child onChange={onChange} />
  </div>)
}

export default App