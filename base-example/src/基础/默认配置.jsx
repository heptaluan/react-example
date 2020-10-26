import React, { Component } from 'react'

export default class App extends Component {
  // 默认配置 defaultProps
  static defaultProps = {
    likedText: '喜欢',
    unlikedText: '点赞'
  }

  constructor() {
    super()
    this.state = { isLiked: false }
  }

  handleClickOnLikeButton() {
    // 并且传递进来的 props 不能修改
    // 比如使用 this.props.likedText = '123' 会报错
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render() {
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked
          ? this.props.likedText
          : this.props.unlikedText} 👍
      </button>
    )
  }
}
