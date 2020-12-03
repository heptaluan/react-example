import React, { Component } from 'react'
import Comment from './Comment'
import PropTypes from 'prop-types'

export default class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onDeleteComment: PropTypes.func
  }

  static defaultProps = {
    comments: []
  }

  handleDeleteComment(index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }

  render() {
    return (
      <div>
        {this.props.comments ? this.props.comments.map((comment, i) => {
          return <Comment
            onDeleteComment={this.handleDeleteComment.bind(this)}
            index={i}
            comment={comment}
            key={i} />
        }) : null}
      </div>
    )
  }
}
