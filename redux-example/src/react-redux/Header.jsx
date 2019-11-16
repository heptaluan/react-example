import React, { Component } from 'react'
import { connect } from './react-redux'

class Header extends Component {
  render() {
    return (
      <div>
        <h1 style={{color: this.props.themeColor }}>hello</h1>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    themeColor: state.themeColor
  }
}

Header = connect(mapStateToProps)(Header)

export default Header