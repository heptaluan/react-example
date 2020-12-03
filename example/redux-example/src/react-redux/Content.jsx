import React, { Component } from 'react'
import Header from './Header'
import ThemeSwitch from './ThemeSwitch'
import { connect } from './react-redux'

class Content extends Component {
  render() {
    return (
      <div>
        <Header />
        <p style={{ color: this.props.themeColor }}>world</p>
        <ThemeSwitch />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    themeColor: state.themeColor
  }
}

Content = connect(mapStateToProps)(Content)

export default Content