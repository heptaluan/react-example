// 这里需要注意
// connect 现在是接受一个参数 mapStateToProps，然后返回一个函数，这个返回的函数才是高阶组件
// 它会接受一个组件作为参数，然后用 Connect 把组件包装以后再返回
import React, { Component } from 'react'

export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends Component {

    constructor() {
      super()
      this.state = {
        allProps: {}
      }
    }

    componentDidMount() {
      const { store } = this.context
      this._updateProps()
      store.subscribe(() => this._updateProps())
    }

    _updateProps() {
      const { store } = this.context
      let stateProps = mapStateToProps
        ? mapStateToProps(store.getState(), this.props)
        : {}
      let dispatchProps = mapDispatchToProps
        ? mapDispatchToProps(store.dispatch, this.props)
        : {}
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }

    render() {
      return <WrappedComponent {...this.state.allProps} />
    }
  }
  return Connect
}