import React, { Component, useState, useEffect } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <Example />
      </div>
    )
  }
}

function Example() {
  // 声明一个叫 count 的 state 变量
  const [count, setCount] = useState(0)

  // 相当于 componentDidMount 和 componentDidUpdate
  useEffect(_ => {
    document.title = `clicked ${count} times`
  })
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={_ => setCount(count + 1)}>
        Click Me
      </button>
    </div>
  )
}