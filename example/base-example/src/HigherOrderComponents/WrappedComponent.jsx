import React, { Component } from 'react'

export default (WrappedComponent, name) => {
  class NewComponent extends Component {
    constructor() {
      super()
      this.state = {
        data: ''
      }
    }

    componentDidMount() {
      this.setState({
        data: 'zhangsan'
      })
    }

    render() {
      return <WrappedComponent data={name ? name : this.state.data} />
    }
  }

  return NewComponent;
}
