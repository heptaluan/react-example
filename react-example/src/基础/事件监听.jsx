import React, { Component } from 'react'

class Title extends Component {
  constructor(props) {
    super(props)
    this.clickHandle = this.clickHandle.bind(this)
  }

  clickHandle(e) {
    console.log(this)
  }

  render() {
    return (
      <h1 onClick={this.clickHandle}>hello world</h1>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Title />
      </div>
    )
  }
}
