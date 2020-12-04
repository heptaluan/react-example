import React, { useState, memo, useMemo } from 'react'

const Child = (data) => {
  return useMemo(() => {
    console.log(`子组件渲染`)
    return <div>
      <p>{data.name}</p>
    </div>
  }, [data.name])
}

const App = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('zhangsan')
  const data = {
    name
  }
  return (<div>
    <div>{count}</div>
    <button onClick={() => setCount(count + 1)}>update count</button>
    <Child data={data} />
  </div>)
}

export default App