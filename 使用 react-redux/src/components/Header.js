import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Header extends Component {
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

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}

Header = connect(mapStateToProps)(Header)

export default Header