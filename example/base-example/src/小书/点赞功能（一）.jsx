// 从一个简单的点赞功能开始，假设现在我们需要实现一个点赞、取消点赞的功能
class LikeButton {
  constructor() {
    this.state = { isLiked: false }
  }

  changeLikeText() {
    const likeText = this.el.querySelector('.like-text')
    this.state.isLiked = !this.state.isLiked
    likeText.innerHTML = this.state.isLiked ? '取消' : '喜欢'
  }

  render() {
    this.el = this.createDOMFromString(`
      <button class='like-button'>
        <span class='like-text'>喜欢</span>
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