import React, { Component } from 'react'
import emitter from './events'

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'List1',
    }
  }
  componentDidMount() {
    // 组件装载完成以后声明一个自定义事件
    this.eventEmitter = emitter.addListener('changeMessage', (message) => {
      this.setState({
        message,
      })
    })
  }
  componentWillUnmount() {
    // 组件卸载的时候取消订阅
    emitter.removeListener(this.eventEmitter)
  }
  render() {
    return (
      <div>
        {this.state.message}
      </div>
    )
  }
}