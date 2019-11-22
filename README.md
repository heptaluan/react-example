`react` 相关 `demo` 汇总及一些知识点记录

----


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










## Hook

主要解决的问题

* 在组件之间复用状态逻辑很难，`Hook` 使你在无需修改组件结构的情况下复用状态逻辑

* 复杂组件变得难以理解，`Hook` 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）

* 难以理解的 `Class`，`Hook` 使你在非 `Class` 的情况下可以使用更多的 `React` 特性

## Hook 概览

下面是一个简答的例子

```js
import React, { Component, useState } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <Example />
      </div>
    )
  }
}

function Example() {
  // 声明一个叫 count 的 state 变量
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={_ => setCount(count + 1)}>
        Click Me
      </button>
    </div>
  )
}
```

在上面示例当中，`useState` 就是一个 `Hook`，通过在函数组件里调用它来给组件添加一些内部 `state`，`React` 会在重复渲染时保留这个 `state`

`useState` 会返回一对值：**当前状态**和**一个让你更新它的函数**，你可以在事件处理函数中或其他一些地方调用这个函数

它类似 `Class` 组件的 `this.setState`，但是它不会把新的 `state` 和旧的 `state` 进行合并

`useState` 唯一的参数就是初始 `state`，值得注意的是，不同于 `this.state`，这里的 `state` 不一定要是一个对象，这个初始 `state` 参数只有在第一次渲染时会被用到



#### 声明多个 state 变量

可以在一个组件中多次使用 `State Hook`

```js
const [age, setAge] = useState(42);
const [fruit, setFruit] = useState('banana');
const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```



#### 什么是 Hook?

`Hook` 是一些可以让你在函数组件里**钩入** `React state` 及生命周期等特性的函数

> 但是需要注意的是，`Hook` 不能在 `Class` 组件中使用

`React` 内置了一些像 `useState` 这样的 `Hook`，你也可以创建你自己的 `Hook` 来复用不同组件之间的状态逻辑




## Effect Hook

`useEffect` 就是一个 `Effect Hook`，给函数组件增加了操作**副作用**的能力

它跟 `Class` 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 `API`

比如在之前示例当中添加一个对应标题显示

```js
function Example() {
  // 声明一个叫 count 的 state 变量
  const [count, setCount] = useState(0)

  // 相当于 componentDidMount 和 componentDidUpdate
  useEffect(_ => {
    document.title = `clicked ${count} times`

    // 还可以通过返回一个函数来指定如何清除相应的副作用
    return _ => {
      // ...
    }
  })
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={_ => setCount(count + 1)}>
        Click Me
      </button>
    </div>
  )
}
```

当你调用 `useEffect` 时，就是在告诉 `React` 在完成对 `DOM` 的更改后运行你的副作用函数

由于副作用函数是在组件内声明的，所以它们可以访问到组件的 `props` 和 `state`

默认情况下，`React` 会在每次渲染后调用副作用函数（包括第一次渲染的时候）

跟 `useState` 一样，你可以在组件中多次使用 `useEffect`

```js
useEffect(_ => {
  document.title = `clicked ${count} times`;
});

useEffect(_ => {
  console.log(`clicked ${count} times`)
});
```

通过使用 `Hook`，你可以把组件内相关的副作用组织在一起（例如创建订阅及取消订阅），而不要把它们拆分到不同的生命周期函数里


## Hook 使用规则

`Hook` 就是 `JavaScript` 函数，但是使用它们会有两个额外的规则

* 只能在函数最外层调用 `Hook`，不要在循环、条件判断或者子函数中调用

* 只能在 `React` 的函数组件中（包括自定义的 `Hook`）当中调用 `Hook`，不要在其他 `JavaScript` 函数中调用


## 与 Class 的区别

我们先来看一个与之前示例相同的一个等价的 `Class` 写法

```JS
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>clicked {this.state.count} times</p>
        <button onClick={_ => this.setState({ count: this.state.count + 1 })}>
          Click Me
        </button>
      </div>
    );
  }
}
```


## 声明 State 的区别

在 `Class` 中，我们通过在构造函数中设置 `this.state` 为 `{ count: 0 }` 来进行初始化

```js
constructor(props) {
  super(props);
  this.state = {
    count: 0
  };
}
```

而在 `Hook` 当中，我们没有 `this`，所以不能分配或读取 `this.state`

所以我们直接在组件当中调用 `useState` 的 `Hook`

```js
// 声明一个叫 count 的 state 变量
const [count, setCount] = useState(0)
```

这里主要涉及到三个问题

#### 调用 useState 方法的时候做了什么?

它定义了一个 state 变量，一般来说，在函数退出后变量就就会消失（销毁），而 state 中的变量会被 React 保留

#### useState 需要哪些参数？

useState() 方法里面唯一的参数就是初始 state

如果我们想要在 state 中存储两个不同的变量，只需调用 useState() 两次即可

#### useState 方法的返回值是什么？

会返回当前的 state 以及更新 state 的函数，但是需要成对的来获取它们

所以针对上面的示例，我们可以知道

```js
// 声明一个叫 count 的 state 变量
const [count, setCount] = useState(0)
```

我们声明了一个叫 count 的 state 变量，然后把它设置为 0

React 会在重复渲染的时候记住它当前的值，并且提供最新的值给我们的函数

我们可以通过调用 setCount 来更新当前的 count



## 读取 State 的区别

在 Class 当中显示当前的 count，我们使用 this.state.count

```html
<p>clicked {this.state.count} times</p>
```

而在函数中，我们可以直接使用 count

```html
<p>clicked {count} times</p>
```


## 更新 State 的区别

在 Class 当中，我们需要调用 this.setState() 来更新 count 的值

```jsx
<button onClick={_ => this.setState({ count: this.state.count + 1 })}>
  Click Me
</button>
```

在函数中，我们已经有了 setCount 和 count 变量，所以不需要 this

```jsx
<button onClick={_ => setCount(count + 1)}>
  Click Me
</button>
```


## 无需清除的 effect

有时候，我们只想在 React 更新 DOM 之后运行一些额外的代码

我们先来看看在 Class 当中的使用

```js
class Example extends React.Component {

  // ...

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  // ...

}
```

在很多情况下，我们希望组件在加载和更新时执行同样的操作，但 React 的 class 组件没有提供这样的方法

如上示例，我们需要在两个生命周期函数当中编写重复的代码（即便提取成方法也还是需要调用两次）

在开头的示例当中，我们已经使用了 useEffect 来执行相同的操作

```js
// 相当于 componentDidMount 和 componentDidUpdate
useEffect(_ => {
  document.title = `clicked ${count} times`
})
```

同样的，涉及到三个问题

#### useEffect 做了什么？

通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行哪些操作



#### 为什么在组件内部调用 useEffect？

将 useEffect 放在组件内部让我们可以在 effect 中直接访问 count state 变量（或其他 props）

Hook 使用了 JavaScript 的闭包机制，所以我们不需要特殊的 API 来读取它（它已经保存在函数作用域中）


#### useEffect 会在每次渲染后都执行吗？

默认情况下，它在第一次渲染之后和每次更新之后都会执行（但是可以进行控制）



## 需要清除的 effect

但是在实际当中，还有一些副作用是需要清除的，例如订阅外部数据源

我们来比较一下如何用 Class 和 Hook 来实现

#### 使用 Class 的示例

在 React class 中，你通常会在 componentDidMount 中设置订阅，并在 componentWillUnmount 中清除它

```js
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```

> 有一点需要注意，以上示例还需要 componentDidUpdate 方法才能保证完全正确，后续会进行介绍


#### 使用 Hook 的示例

之前我们已经介绍过了，useEffect 接收第二个参数，用来执行清理操作

```js
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // 命名为 cleanup 是为了表明此函数的目的
    // 但其实也可以返回一个箭头函数或者给起一个别的名字
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

这里也有两个问题

#### 为什么要在 effect 当中返回一个函数

这是 effect 可选的清除机制，每个 effect 都可以返回一个清除函数（如此便可以将添加和移除订阅的逻辑放在一起）

#### React 何时清除 effect？

React 会在组件卸载的时候执行清除操作





## 通过跳过 Effect 进行性能优化

在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题

在 Class 组件中，我们可以通过在 componentDidUpdate 中添加对 prevProps 或 prevState 的比较逻辑解决

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `clicked ${this.state.count} times`;
  }
}
```

在 useEffect 当中也可以进行相关处理，只要**传递数组**作为 useEffect 的**第二个可选参数**即可

```js
useEffect(() => {
  document.title = `clicked ${count} times`;
}, [count])
```

在上面示例当中，我们传入 [count] 作为第二个参数，如果 count 的值在重新渲染的时候没有发生变化

React 会跳过这个 effect，这就实现了性能的优化

对于有清除操作的 effect 同样适用，比如之前的示例

```js
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
// 仅在 props.friend.id 发生变化时，重新订阅
}, [props.friend.id]);
```

不过有一个需要注意的地方

> 如果你要使用此优化方式，请确保数组中包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量
>
> 即数组最好包含所有在 effect 当中使用的可能变化的变量

如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数

这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行



## useState 函数式更新

```js
const [state, setState] = useState(initialState)
```

返回一个 state，以及更新 state 的函数，这里主要介绍函数式更新

如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 setState

该函数将接收先前的 state，并返回一个更新后的值

```js
function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```

`-` 和 `+` 按钮采用函数式形式，因为被更新的 state 需要基于之前的 state

但是 `Reset` 按钮则采用普通形式，因为它总是把 count 设置回初始值

不过需要注意的是

> 与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象
>
> 你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果

```js
setState(prevState => {
  // 也可以使用 Object.assign
  return { ...prevState, ...updatedValues }
})
```



## useContext

```js
const value = useContext(MyContext);
```

接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值

当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定

当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值

比如如下代码

```js
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```


## useReducer

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

useState 的替代方案，它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法

在某些场景下，useReducer 会比 useState 更适用，因为可以向子组件传递 dispatch 而不是回调函数

下面是一个用 reducer 重写的计数器示例

```js
// 将初始 state 作为第二个参数传入 useReducer，用以指定初始 state
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={_ => dispatch({ type: 'decrement' })}> - </button>
      <button onClick={_ => dispatch({ type: 'increment' })}> + </button>
    </>
  );
}
```



#### 惰性初始化

你可以选择惰性地创建初始 state，为此只需要将 init 函数作为 useReducer 的第三个参数传入，这样初始 state 将被设置为 init(initialArg)

这么做可以将用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利

```js
function init(initialCount) {
  // 一系列复杂操作
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      return state;
  }
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button onClick={_ => dispatch({ type: 'reset', payload: initialCount })}> Reset </button>
      <button onClick={_ => dispatch({ type: 'decrement' })}> - </button>
      <button onClick={_ => dispatch({ type: 'increment' })}> + </button>
    </>
  );
}
```