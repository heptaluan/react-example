// 前面介绍的高阶组件的实现方式都是由高阶组件处理通用逻辑，然后将相关属性传递给被包装组件，我们称这种实现方式为属性代理
// 除了属性代理外，还可以通过继承方式实现高阶组件：通过继承被包装组件实现逻辑的复用，继承方式实现的高阶组件常用于渲染劫持
// 例如，当用户处于登录状态时，允许组件渲染；否则渲染一个空组件

import React, { Component } from 'react';

function withAuth(WrappedComponent) {
  // 继承方式实现的高阶组件对被包装组件具有侵入性
  // 当组合多个高阶组件使用时
  // 很容易因为子类组件忘记通过 super 调用父类组件方法而导致逻辑丢失
  // 因此，在使用高阶组件时，应尽量通过代理方式实现高阶组件
  return class extends WrappedComponent {
    render() {
      if (this.props.loggedIn) {
        return super.render();
      } else {
        return null;
      }
    }
  }
}