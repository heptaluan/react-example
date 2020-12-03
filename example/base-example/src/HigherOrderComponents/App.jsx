// 高阶组件就是一个函数，传给它一个组件，它返回一个新的组件，新的组件使用传入的组件作为子组件
// 高阶组件的作用是用于代码复用，可以把组件之间可复用的代码、逻辑抽离到高阶组件当中，新的组件和传入的组件通过 props 传递信息


// 当在使用这个组件的时候实际是用了被加工过的组件
import React, { Component } from 'react'
import DefaultName from './HigherOrderComponents/DefaultName'

export default class App extends Component {
  render() {
    return (
      <div>
        默认用户名：<DefaultName />
      </div>
    )
  }
}
