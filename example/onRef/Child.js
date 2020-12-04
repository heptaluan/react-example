import React from 'react'

export default class Child extends React.Component {
  state = {
    name: '初始值'
  }

  componentDidMount() {
    this.props.onRef(this, this.state.name)
  }

  click = () => {
    this.setState({
      name: '改变后的值'
    })
  };

  render() {
    return (
      <div>
        <div>
          <div>{this.state.name}</div>
        </div>
      </div>
    )
  }
}