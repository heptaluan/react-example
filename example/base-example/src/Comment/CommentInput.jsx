import React, { Component } from 'react'

export default class CommentInput extends Component {
  constructor(props) {
    super(props)
    this.state ={
      username: '',
      content: ''
    }

    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUserNameChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  handleContentChange(e) {
    this.setState({
      content: e.target.value
    })
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content,
      })
      this.setState({
        content: ''
      })
    }
  }

  render() {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input value={this.state.username} onChange={this.handleUserNameChange}/>
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea value={this.state.content} onChange={this.handleContentChange} />
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleSubmit}>
            发布
          </button>
        </div>
      </div>
    )
  }
}
