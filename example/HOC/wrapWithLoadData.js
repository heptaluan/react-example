import React, { Component } from 'react';

export default (WrappedComponent, name) => {
  class NewComponent extends Component {

    constructor(props) {
      super(props)
      this.state = {
        data: ''
      }
    }

    componentDidMount() {
      let data = localStorage.getItem(name)
      this.setState({
        data
      })
    }

    render() {
      return <WrappedComponent data={this.state.data} />
    }
  }
  return NewComponent
}