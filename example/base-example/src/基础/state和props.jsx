// state
// state 的主要作用是用于组件保存、控制、修改自己的可变状态
// state 在组件内部初始化，可以被组件自身修改，而外部不能访问也不能修改
// 你可以认为 state 是一个局部的、只能被组件自身控制的数据源
// state 中状态可以通过 this.setState 方法进行更新，setState 会导致组件的重新渲染

// props
// props 的主要作用是让使用该组件的父组件可以传入参数来配置该组件
// 它是外部传进来的配置参数，组件内部无法控制也无法修改
// 除非外部组件主动传入新的 props，否则组件的 props 永远保持不变

// state vs props
// state 和 props 有着千丝万缕的关系，它们都可以决定组件的行为和显示形态
// 一个组件的 state 中的数据可以通过 props 传给子组件，一个组件可以使用外部传入的 props 来初始化自己的 state
// 但是它们的职责其实非常明晰分明：state 是让组件控制自己的状态，props 是让外部对组件自己进行配置

// 标准写法
export default class HelloWorld extends Component {
  constructor() {
    super()
  }

  sayHi() {
    console.log(`hello wold`)
  }

  render() {
    return (
      <div onClick={this.sayHi.bind(this)}> hello world </div>
    )
  }
}


// 函数式组件的编写方式
const HelloWorld = (props) => {
  const sayHi = (e) => console.log(`hello wold`)
  return (
    <div onClick={sayHi}> hello world </div>
  )
}