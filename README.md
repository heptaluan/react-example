`react` 相关 `demo` 汇总


----

一些知识点记录


## Code Spliting

在 `16.6` 版本之前，`code-spliting` 通常是由第三方库来完成的，比如 [react-loadble](https://github.com/jamiebuilds/react-loadable)

在 `16.6` 版本中提供了 `Suspense` 和 `lazy` 这两个钩子, 因此在之后的版本中便可以使用其来实现 `Code Spliting`

`Code Spliting` 在 `React` 中的使用方法是在 `Suspense` 组件中使用 `<LazyComponent>` 组件

```jsx
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```






## 在 JSX 类型中使用点语法

在 `JSX` 中，你也可以使用点语法来引用一个 `React` 组件，当你在一个模块中导出许多 `React` 组件时，这会非常方便

例如，如果 `MyComponents.DatePicker` 是一个组件，你可以在 `JSX` 中直接使用

```js
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```






## Portals

`Portal` 提供了一种将子节点渲染到存在于父组件以外的 `DOM` 节点的解决方案

```js
ReactDOM.createPortal(child, container)
```

第一个参数（`child`）是任何可渲染的 `React` 子元素，例如一个元素，字符串或 `fragment`

第二个参数（`container`）是一个 `DOM` 元素

通常来讲，当你从组件的 `render` 方法返回一个元素时，该元素将被挂载到 `DOM` 节点中离其最近的父节点

```js
render() {
  // React 挂载了一个新的 div，并且把子元素渲染其中
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```

然而，有时候将子元素插入到 `DOM` 节点中的不同位置也是有好处的

```js
render() {
  // React 并*没有*创建一个新的 div。它只是把子元素渲染到 `domNode` 中。
  // `domNode` 是一个可以在任何位置的有效 DOM 节点。
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

一个 `portal` 的典型用例是当父组件有 `overflow: hidden` 或 `z-index` 样式时，但你需要子组件能够在视觉上**跳出**其容器（例如对话框、悬浮卡以及提示框）






## Refs

`Refs` 是使用 `React.createRef()` 创建的，并通过 `ref` 属性附加到 `React` 元素

在构造组件时，通常将 `Refs` 分配给实例属性，以便可以在整个组件中引用它们

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

当 `ref` 被传递给 `render` 中的元素时，对该节点的引用可以在 `ref` 的 `current` 属性中被访问

```js
const node = this.myRef.current;
```

`ref` 的值根据节点的类型而有所不同

* 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 `DOM` 元素作为其 `current` 属性

* 当 `ref` 属性用于自定义 `Class` 组件时，ref 对象接收组件的挂载实例作为其 `current` 属性

* 不能在函数组件上使用 `ref` 属性，因为他们没有实例


#### 为 DOM 元素添加 ref

```js
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 我们通过 current 来访问 DOM 节点
    this.textInput.current.focus();
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 textInput 上
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />

        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

`React` 会在组件挂载时给 `current` 属性传入 `DOM` 元素，并在组件卸载时传入 `null` 值

`ref` 会在 `componentDidMount` 或 `componentDidUpdate` 生命周期钩子触发前更新


#### 为 Class 组件添加 Ref

如果我们想包装上面的 `CustomTextInput`，来模拟它挂载之后立即被点击的操作

我们可以使用 `ref` 来获取这个自定义的 `input` 组件并手动调用它的 `focusTextInput` 方法

```js
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

请注意，这仅在 `CustomTextInput` 声明为 `Class` 时才有效

```js
class CustomTextInput extends React.Component {
  // ...
}
```

也可以采用下面这种方式

```js
import React, { Component } from 'react'

export default class AutoFocusTextInput extends Component {
  componentDidMount() {
    this.input.focus()
  }

  render() {
    return (
      // 可以看到我们给 input 元素加了一个 ref 属性，这个属性值是一个函数
      // 当 input 元素在页面上挂载完成以后，React.js 就会调用这个函数，并且把这个挂载以后的 DOM 节点传给这个函数
      // 在函数中我们把这个 DOM 元素设置为组件实例的一个属性，这样以后我们就可以通过 this.input 获取到这个 DOM 元素

      // 但是记住一个原则：能不用 ref 就不用
      // 特别是要避免用 ref 来做 React.js 本来就可以帮助你做到的页面自动更新的操作和事件监听
      <div>
        <input ref={input => this.input = input} type="text" />
      </div>
    )
  }
}
```