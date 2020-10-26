import React, { Component } from 'react'

class Title extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLiked: false
    }

    this.handleClickOnLikeButton = this.handleClickOnLikeButton.bind(this)
  }

  /**
   * 来看下面的这些操作，每次的后续操作都依赖前一个 setState 的结果
   */
  // handleClickOnLikeButton() {
  //   this.setState({ count: 0 })                   // => this.state.count 还是 undefined
  //   this.setState({ count: this.state.count + 1}) // => undefined + 1 = NaN
  //   this.setState({ count: this.state.count + 2}) // => NaN + 2 = NaN
  // }

  /**
   * 如果你想在 setState 之后使用新的 state 来做后续运算
   * 那么就需要使用 setState 的第二种使用方式，可以接受一个函数作为参数
   * 这样就可以达到上述的利用上一次 setState 结果进行运算的效果
   * 执行下来以后就可以发现结果为 3
   * 
   * 我们进行了三次 setState，但是实际上组件只会重新渲染一次，而不是三次
   * 这是因为在 React.js 内部会把 JavaScript 事件循环中的消息队列的同一个消息中的 setState 都进行合并以后再重新渲染组件
   * 深层的原理并不需要过多纠结，你只需要记住的是：在使用 React.js 的时候，并不需要担心多次进行 setState 会带来性能问题
   */
  handleClickOnLikeButton() {
    this.setState((prevState) => {
      return { count: 0 }
    })
    this.setState((prevState) => {
      return { count: prevState.count + 1 }
    })
    this.setState((prevState) => {
      return { count: prevState.count + 2 }
    })
  }

  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.handleClickOnLikeButton}>
          {this.state.isLiked ? '取消' : '点赞'} 👍
      </button>
      </div>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Title />
      </div>
    )
  }
}
