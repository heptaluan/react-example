import React from 'react';

const HocInput = WrapperComponent =>
  class extends React.Component {
    state = {
      value: this.props.initialValue
    }
    onChange = e => {
      this.setState({ value: e.target.value })
      if (this.props.onChange) {
        this.props.onChange(e.target.value)
      }
    }
    render() {
      const newProps = {
        value: this.state.value,
        onChange: this.onChange
      }
      return <WrapperComponent {...newProps} />
    }
  }

export default HocInput