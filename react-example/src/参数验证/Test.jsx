import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        {this.props.data}
      </div>
    )
  }
}

Test.propTypes = {
  name: PropTypes.number.isRequired
};