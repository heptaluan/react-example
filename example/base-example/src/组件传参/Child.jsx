import React, { Component } from 'react'

export default class Test extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.changeNum(666)
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>click</button>
      </div>
    )
  }
}
