// 稍微调整一下，一旦状态发生改变，就重新调用 render 方法，构建一个新的 DOM 元素
class LikeButton {
  constructor() {
    this.state = { isLiked: false }
  }

  setState(state) {
    const oldEl = this.el
    this.state = state
    this.el = this.render()
    // 这个方法是供实例对象进行调用的
    if (this.onStateChange) this.onStateChange(oldEl, this.el)
  }

  changeLikeText() {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render() {
    this.el = this.createDOMFromString(`
      <button class='like-button'>
        <span class='like-text'>${this.state.isLiked ? '喜欢' : '取消'}</span>
        <span>👍</span>
      </button>
    `)
    this.el.addEventListener('click', this.changeLikeText.bind(this), false)
    return this.el
  }

  createDOMFromString(domString) {
    const div = document.createElement('div')
    div.innerHTML = domString
    return div
  }
}

// 使用
const likeButton = new LikeButton()
const wrapper = document.querySelector('.wrapper')
wrapper.appendChild(likeButton.render())         // 第一次插入 DOM 元素
likeButton.onStateChange = (oldEl, newEl) => {
  wrapper.insertBefore(newEl, oldEl)             // 插入新的元素
  wrapper.removeChild(oldEl)                     // 删除旧的元素
}

/**

这里每次 setState 都会调用 onStateChange 方法，而这个方法是实例化以后时候被设置的，所以可以自定义 onStateChange 的行为

这里做的事是，每当 setState 中构造完新的 DOM 元素以后，就会通过 onStateChange 告知外部插入新的 DOM 元素，然后删除旧的元素，页面就更新了

但是每次 setState 都重新构造、新增、删除 DOM 元素，会导致浏览器进行大量的重排，严重影响性能，不过没有关系，这种行为可以被一种叫 Virtual-DOM 的策略规避掉

*/