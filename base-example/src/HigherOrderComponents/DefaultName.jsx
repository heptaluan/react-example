import React, { Component } from 'react'
import wrapWithLoadData from './WrappedComponent'

class DefaultName extends Component {
  
  render() {
    return (
      <span>{this.props.data}</span>
    )
  }
}

DefaultName = wrapWithLoadData(DefaultName, 'lisi')

export default DefaultName