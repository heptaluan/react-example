import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
import store from './store/index'
import { getInputValueAction, addListItem, delListItem } from './store/actions'

export default class TodoList extends Component {

  constructor(props) {
    super(props)
    this.state = store.getState()
    this.hanleInputChange = this.hanleInputChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    store.subscribe(_ => {
      this.setState(store.getState())
    })
  }

  hanleInputChange(e) {
    store.dispatch(getInputValueAction(e.target.value))
  }

  handleButtonClick() {
    store.dispatch(addListItem())
  }

  handleItemDelete(index) {
    store.dispatch(delListItem(index))
  }
  
  render() {
    return (
      <div style={{width: 600, margin: 50}}>
        <Input 
          value={this.state.inputValue} 
          placeholder="请输入列表名称" 
          style={{width: 500, marginBottom: 20}}
          onChange={this.hanleInputChange}
        ></Input>
        <Button 
          type="primary" 
          style={{float: "right"}}
          onClick={this.handleButtonClick}
        >提交</Button>
        <List
          style={{width: 500}}
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => (<List.Item onClick={this.handleItemDelete.bind(this, index)}>{item}</List.Item>)}
        ></List>
      </div>
    )
  }
}
