import React, { Component } from 'react'

class Title extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLiked: false
    }

    this.handleClickOnLikeButton = this.handleClickOnLikeButton.bind(this)
  }

  handleClickOnLikeButton() {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render() {
    return (
      <button onClick={this.handleClickOnLikeButton}>
        {this.state.isLiked ? '取消' : '点赞'} 👍
      </button>
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
