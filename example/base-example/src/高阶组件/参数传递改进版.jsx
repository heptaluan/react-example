// 但实际情况中，我们很少之前的方式传递参数，而是采用更加灵活、更具通用性的函数形式

import React, { Component } from 'react';

const withPersistentData = name => WrappedComponent => {
  return class extends Component {
    componentWillMount() {
      let data = { name };
      this.setState({ data });
    }
    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}

// 定义组件
class MyComponent extends Component {
  render() {
    return <p>{this.props.data.name}</p>;
  }
}

export const MyComponentWithPersistentData1 = withPersistentData('zhangsan')(MyComponent)
export const MyComponentWithPersistentData2 = withPersistentData('lisi')(MyComponent)