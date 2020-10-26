import React, { Component } from 'react'

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}