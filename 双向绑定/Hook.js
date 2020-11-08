import React, { Component, useState } from 'react'

function useBind(initialValue) {
  const [value, setValue] = useState(initialValue || '')
  const onChange = e => {
    setValue(e.target.value)
  }
  return { value, onChange }
}

function InputBind() {
  const inputProps = useBind('init')
  return (
    <>
      <p>{inputProps.value}</p>
      <input {...inputProps} />
    </>
  )
}

class App extends Component {
  render() {
    return (
      <InputBind />
    )
  }
}

export default App