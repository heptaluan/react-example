import React, { Component } from 'react'

export default class Clock extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: new Date()
    }
  }

  componentDidMount() {
    this.timer = setInterval(_ => {
      this.setState({
        data: new Date()
      })
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div>
        {this.state.data.toLocaleTimeString()}
      </div>
    )
  }
}
