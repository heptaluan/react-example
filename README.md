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