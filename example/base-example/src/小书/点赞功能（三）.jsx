// 为了让代码更灵活，可以写更多的组件，我们把这种模式抽象出来，放到一个 Component 类当中

// 这个是一个组件父类 Component，所有的组件都可以继承这个父类来构建
class Component {
  setState(state) {
    const oldEl = this.el
    this.state = state
    this._renderDOM()
    if (this.onStateChange) this.onStateChange(oldEl, this.el)
  }

  // _renderDOM 方法会调用 this.render 来构建 DOM 元素并且监听 onClick 事件
  // 所以，组件子类继承的时候只需要实现一个返回 HTML 字符串的 render 方法就可以了
  _renderDOM() {
    this.el = createDOMFromString(this.render())
    if (this.onClick) {
      this.el.addEventListener('click', this.onClick.bind(this), false)
    }
    return this.el
  }
}

// 还有一个额外的 mount 的方法，其实就是把组件的 DOM 元素插入页面，并且在 setState 的时候更新页面
class LikeButton extends Component {
  constructor() {
    super()
    this.state = { isLiked: false }
  }

  onClick() {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render() {
    return `
      <button class='like-btn'>
        <span class='like-text'>${this.state.isLiked ? '取消' : '点赞'}</span>
        <span>👍</span>
      </button>
    `
  }
}

mount(new LikeButton(), wrapper)


// 在实际开发当中，可能需要给组件传入一些自定义的配置数据
// 例如说想配置一下点赞按钮的背景颜色，如果我给它传入一个参数，告诉它怎么设置自己的颜色
// 所以我们可以给组件类和它的子类都传入一个参数 props，作为组件的配置参数
class LikeButton extends Component {
  constructor(props) {
    // 继承的时候通过 super(props) 把 props 传给父类，这样就可以通过 this.props 获取到配置参数
    super(props)
    this.state = { isLiked: false }
  }

  onClick() {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render() {
    return `
      <button class='like-btn' style="background-color: ${this.props.bgColor}">
        <span class='like-text'>
          ${this.state.isLiked ? '取消' : '点赞'}
        </span>
        <span>👍</span>
      </button>
    `
  }
}

mount(new LikeButton({ bgColor: 'red' }), wrapper)



// 如果我们需要写另外一个组件，只需要像上面那样，简单地继承一下 Component 类就好了
class RedBlueButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'red'
    }
  }

  onClick() {
    this.setState({
      color: 'blue'
    })
  }

  render() {
    return `
      <div style='color: ${this.state.color};'>${this.state.color}</div>
    `
  }
}