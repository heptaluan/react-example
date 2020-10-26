import React, { Component } from 'react'

export default class Toggle extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      showToggle: true
    }
  }

  handleToggle = () => {
    this.setState({
      showToggle: !this.state.showToggle
    })
  }
  
  render() {
    return (
      <div onClick={this.handleToggle}>
        {this.state.showToggle ? 'ON' : 'OFF'}
      </div>
    )
  }
}
