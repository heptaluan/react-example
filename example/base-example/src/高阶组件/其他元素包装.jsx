/**
 * 我们还可以在高阶组件渲染 WrappedComponent 时添加额外的元素，这种情况通常用于为 WrappedComponent 增加布局或修改样式
 */

import React, { Component } from 'react';

function withRedBackground(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <div style={{ backgroundColor: 'red' }}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }
}

// 定义组件
class MyComponent extends Component {
  render() {
    return (
      <p>hello world</p>
    )
  }
}

const MyComponentWithRedBackground = withRedBackground(MyComponent);

export default MyComponentWithRedBackground;