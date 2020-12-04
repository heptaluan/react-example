import React, { useState, memo } from 'react'

const Child = memo(({ data }) => {
  const [name, setName] = useState(data)
  return (
    <div>
      <div>Child</div>
      <div>{name} -- {data}</div>
    </div>
  )
})

const App = _ => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('zhangsan')
  return (
    <div>
      <div>{count}</div>
      <button onClick={_ => setCount(count + 1)}>update count</button>
      <button onClick={_ => setName('list')}>update name</button>
      <Child data={name} />
    </div>
  )
}

export default App