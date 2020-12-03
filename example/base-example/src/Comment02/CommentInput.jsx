import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CommentInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state ={
      username: '',
      content: ''
    }

    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUserNameBlur = this.handleUserNameBlur.bind(this)
  }

  // 页面加载后自动聚焦
  componentDidMount() {
    this.textarea.focus()
  }

  componentWillMount() {
    this._loadUserName()
  }

  // 读取用户名
  _loadUserName() {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({
        username,
      })
    }
  }

  // 保存用户名
  _saveUserName(username) {
    localStorage.setItem('username', username)
  }

  handleUserNameBlur(e) {
    this._saveUserName(e.target.value)
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
            <input
              onBlur={this.handleUserNameBlur}
              value={this.state.username}
              onChange={this.handleUserNameChange}/>
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea
             ref={(textarea) => this.textarea = textarea}
             value={this.state.content} onChange={this.handleContentChange} />
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
