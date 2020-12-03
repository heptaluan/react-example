import React, { Component } from 'react';
import wrapWithLoadData from './HOC/wrapWithLoadData'

class InputWithUserName extends Component {
  
  static defaultProps = {
    data: ''
  }
  
  render() {
    return (
      <input defaultValue={this.props.data}/>
    )
  }
}

InputWithUserName = wrapWithLoadData(InputWithUserName, 'username')

class App extends Component {
  render () {
    return (
      <InputWithUserName></InputWithUserName>
    )
  }
}

export default App