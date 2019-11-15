import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'world'
    }
  }
  render() {
    return (
      <div>
        <h1>hello {this.state.text}</h1>
      </div>
    )
  }
}



/**

jsx 是 JavaScript 语言的一种语法扩展，长得像 HTML，但并不是 HTML

React.js 可以用 jsx 来描述你的组件长什么样的

jsx 在编译的时候会变成相应的 JavaScript 对象描述

react-dom 负责把这个用来描述 UI 信息的 JavaScript 对象变成 DOM 元素，并且渲染到页面上

*/