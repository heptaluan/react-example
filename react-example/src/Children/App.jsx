import React, { Component } from 'react'
import Children from './Children/Children'

export default class App extends Component {
  render() {
    return (
      <div>
        <Children>
          <h2>hello</h2>
          <h2>world</h2>
        </Children>
      </div>
    )
  }
}
