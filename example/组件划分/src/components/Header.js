import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Header extends Component {
  static propTypes = {
    themeColor: PropTypes.string
  }

  render() {
    return (
      <h2 style={{ color: this.props.themeColor }}>
        标题
      </h2>
    )
  }
}
