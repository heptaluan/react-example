import React from 'react';

class HocBind extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.initialValue
    }
  }
  onChange = e => {
    this.setState({ value: e.target.value })
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }
  render() {
    return (
      <>
        {this.props.children({
          value: this.state.value,
          onChange: this.onChange
        })}
      </>
    )
  }
}

export default HocBind