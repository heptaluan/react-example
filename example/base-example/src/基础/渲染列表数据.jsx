import React, { Component } from 'react'

const users = [
  { username: 'zhangsan', age: 21, sex: 'woman' },
  { username: 'lisi', age: 22, sex: 'man' },
  { username: 'wangwu', age: 19, sex: 'woman' },
  { username: 'zhaoliu', age: 20, sex: 'man' }
]

class User extends Component {
  render() {
    const { user } = this.props
    return (
      <div>
        <div>姓名：{user.username}</div>
        <div>年龄：{user.age}</div>
        <div>性别：{user.sex}</div>
        <hr />
      </div>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      // 对于用表达式套数组罗列到页面上的元素，都要为每个元素加上 key 属性，这个 key 必须是每个元素唯一的标识
      // 下面这种针对 key 的处理方式并不好
      // 一般来说，key 的值可以直接后台数据返回的 id，因为后台的 id 都是唯一的
      <div>
        {users.map((user, i) => <User key={i} user={user} />)}
      </div>
    )
  }
}
