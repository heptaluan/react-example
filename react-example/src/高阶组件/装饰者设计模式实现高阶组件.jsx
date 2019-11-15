import React, { Component } from 'react';

// 定义高阶组件（函数）
function withPersistentData(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        info: {
          age: 18
        }
      };
    }
    componentWillMount() {
      let data = { name: "aaayang" };
      this.setState({ data });
    }
    render() {
      // 使用组件，并传递内容
      return <WrappedComponent data={this.state.data} {...this.props} {...this.state.info} />
    }
  }
}

// 定义自己的组件
class MyComponent extends Component {
  render() {
    // 可以直接拿到 data，无需自己获取
    return <div>{this.props.data.name}</div>
  }
}

// 利用高阶组件和自己的组件生成一个新的带公用功能的组件
const MyComponentWithPersistentData = withPersistentData(MyComponent);

export default MyComponentWithPersistentData;