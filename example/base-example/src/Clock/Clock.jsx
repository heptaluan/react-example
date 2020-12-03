import React, { Component } from './node_modules/react'

export default class Clock extends Component {
  constructor() {
    super()
    this.state = {
      date: new Date()
    }
  }

  componentWillMount() {
    this.timer = setInterval(_ => {
      this.setState({
        date: new Date()
      })
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div>
        现在的时间是 {this.state.date.toLocaleTimeString()}
      </div>
    )
  }
}
