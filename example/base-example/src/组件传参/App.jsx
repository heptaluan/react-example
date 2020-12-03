import React, { Component } from 'react'
import Child from './组件传参/Child'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 0
    };
    this.changeNum = this.changeNum.bind(this);
  }
  changeNum(num) {
    this.setState({
      num,
    })
  }
  render() {
    let {num} = this.state
    return (
      <div>
        {num}
        <Child changeNum={this.changeNum} />
      </div>
    )
  }
}

