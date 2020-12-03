/***
 * 高阶组件通过 ref 获取被包装组件实例的引用，然后高阶组件就具备了直接操作被包装组件的属性或方法的能力
 */

import React, { Component } from 'react';

function withRef(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.someMethod = this.someMethod.bind(this);
    }
    someMethod() {
      this.wrappedInstance.changeState();
    }
    render() {
      // 为被包装组件添加 ref 属性，从而获取该组件实例并赋值给 this.wrappedInstance
      return <div>
        <WrappedComponent ref={instance => this.wrappedInstance = instance} {...this.props} />
        <button onClick={this.someMethod}>btn</button>
      </div>
    }
  }
}

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0
    };
  }
  changeState() {
    this.setState({
      num: 888
    });
  }
  render() {
    return <div>
      {this.state.num}
    </div>
  }
}

const MyComponentwithRef = withRef(MyComponent);

export default MyComponentwithRef;