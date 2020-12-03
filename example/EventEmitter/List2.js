import React, { Component } from 'react'
import emitter from './events'

export default class List2 extends Component {
  handleClick = (message) => {
    emitter.emit('changeMessage', message)
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this, 'List2')}>点击我改变 List1 组件中显示信息</button>
      </div>
    )
  }
}