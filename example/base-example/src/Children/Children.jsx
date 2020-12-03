import React, { Component } from 'react'

export default class Children extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <div className='two-cols-layout'>
          <div className='sidebar'>
            {this.props.children[0]}
          </div>
          <div className='main'>
            {this.props.children[1]}
          </div>
        </div>
      </div>
    )
  }
}
