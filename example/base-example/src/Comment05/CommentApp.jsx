import React, { Component } from 'react'
import './comment.css'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

export default class CommentApp extends Component {

  constructor() {
    super()
    this.state = {
      comments: []
    }

    this.handleSubmitComment = this.handleSubmitComment.bind(this)
  }

  componentDidMount() {
    this._loadComments()
  }

  _loadComments() {
    const comments = localStorage.getItem('comments')
    if (comments) {
      this.setState({
        comments: JSON.parse(comments)
      })
    }
  }

  _saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  handleSubmitComment(comment) {
    if (!comment) return
    if (!comment.username) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')
    this.state.comments.push(comment)
    this.setState({
      comments: this.state.comments
    })
    this._saveComments(this.state.comments)
  }

  handleDeleteComment(index) {
    const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({
      comments: comments
    })
    this._saveComments(comments)
  }

  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmitComment} />
        <CommentList onDeleteComment={this.handleDeleteComment.bind(this)} comments={this.state.comments} />
      </div>
    )
  }
}
