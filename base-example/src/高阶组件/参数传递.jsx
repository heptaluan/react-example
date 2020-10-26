// 高阶组件的参数并非只能是一个组件，它还可以接收其他参数

import React, { Component } from 'react';

function withPersistentData(WrappedComponent, name) {
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

export const MyComponentWithPersistentData1 = withPersistentData(MyComponent, 'zhangsan')
export const MyComponentWithPersistentData2 = withPersistentData(MyComponent, 'lisi')