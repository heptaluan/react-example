import React, { Component } from 'react'

export default class DangerouslySetHTML extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '<h2>hello world</h2>'
    }
  }
  render() {
    return (
      // 直接使用 this.state.content 在页面上会发现显示的是 <h2>hello world</h2>
      // 所以需要采用如下方式
      <div dangerouslySetInnerHTML={{__html: this.state.content}}></div>
    )
  }
}
