import React, { Component } from 'react'

export default class AutoFocusInput extends Component {
  componentDidMount() {
    this.input.focus()
  }

  render() {
    return (
      // 可以看到我们给 input 元素加了一个 ref 属性，这个属性值是一个函数
      // 当 input 元素在页面上挂载完成以后，React.js 就会调用这个函数，并且把这个挂载以后的 DOM 节点传给这个函数
      // 在函数中我们把这个 DOM 元素设置为组件实例的一个属性，这样以后我们就可以通过 this.input 获取到这个 DOM 元素

      // 但是记住一个原则：能不用 ref 就不用
      // 特别是要避免用 ref 来做 React.js 本来就可以帮助你做到的页面自动更新的操作和事件监听
      <div>
        <input ref={input => this.input = input} type="text" />
      </div>
    )
  }
}
