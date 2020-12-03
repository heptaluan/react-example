import React, { Component } from 'react'

export default (WrappedComponent, name) => {
  class LocalStorageActions extends Component {
    constructor() {
      super()
      this.state = {
        data: null
      }
    }

    componentDidMount() {
      let data = localStorage.getItem(name)
      try {
        // 尝试解析成 JSON 对象
        this.setState({
          data: JSON.parse(data)
        })
      } catch (e) {
        // 如果出错就当初普通字符串进行处理
        this.setState({
          data,
        })
      }
    }

    saveData(data) {
      try {
        // 尝试解析成 JSON 字符串
        localStorage.setItem(name, JSON.stringify(data))
      } catch (e) {
        // 如果出错就当成普通字符串进行保存
        localStorage.setItem(name, `${data}`)
      }
    }

    render() {
      return (
        <WrappedComponent
          data={this.state.data}
          saveData={this.saveData.bind(this)}
          // 这里的意思是把其他的参数原封不动地传递给被包装的组件
          {...this.props}
        />
      )
    }
  }
  return LocalStorageActions
}