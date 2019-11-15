/**
 * 高阶组件可以通过将被包装组件的状态及相应的状态处理方法提升到高阶组件自身内部实现被包装组件的无状态化
 * 一个典型的场景是，利用高阶组件将原本受控组件需要自己维护的状态统一提升到高阶组件中
 */

import React, { Component } from 'react';

function withControlledState(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ''
      };
      this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange(e) {
      this.setState({
        value: e.target.value
      });
    }
    render() {
      // 保存受控组件需要使用的属性和事件处理函数
      const newProps = {
        controlledProps: {
          value: this.state.value,
          onChange: this.handleValueChange
        }
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  }
}

class MyComponent extends Component {
  render() {
    let { value, onChange } = this.props.controlledProps;
    // 此时的 MyComponent 为无状态组件，状态由高阶组件维护
    return <input value={value} onChange={onChange} />
  }
}

const MyComponentWithControlledState = withControlledState(MyComponent);

export default MyComponentWithControlledState;