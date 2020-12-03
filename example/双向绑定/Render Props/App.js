import React, { Component } from 'react';
import HocBind from './HocBind'

class App extends Component {
  render() {
    return (
      <HocBind initialValue="init" onChange={val => console.log(`HocBind`, val)} >
        {props => (
          <>
            <p>{props.value}</p>
            <input placeholder="input" {...props} />
          </>
        )}
      </HocBind>
    )
  }
}

export default App;