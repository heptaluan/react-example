import React, { Component } from 'react';
import HocInput from './HOC'

let Input = props => (
  <>
    <p>{props.value}</p>
    <input placeholder="input" {...props} />
  </>
)

Input = HocInput(Input)

class App extends Component {
  render() {
    return (
      <Input initialValue="init" onChange={val => console.log(`HocInput`, val) } />
    )
  }
}

export default App;