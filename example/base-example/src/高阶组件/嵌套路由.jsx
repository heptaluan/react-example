import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

let Home = () => {
  return 'home';
};

let Posts = ({ match }) => {
  // 这里的 match.url 等于 /posts
  return (
    <div>
      <Route path={`${match.url}/:id`} component={PostDetail} />
      <Route exact path={match.url} component={PostList} />
    </div>
  )
};

const PostDetail = () => {
  return 'PostDetail'
};

const PostList = () => {
  return 'PostList'
};

class App extends Component {
  render() {
    return <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/posts" component={Posts} />
      </Switch>
    </Router>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);