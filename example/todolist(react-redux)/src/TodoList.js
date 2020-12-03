import React from 'react'
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
import { getInputValueAction, addListItem, delListItem } from './store/actions'
import { connect } from 'react-redux'

const TodoList = props => {
  const { inputValue, list, hanleInputChange, handleButtonClick, handleItemDelete } = props
  return (
    <div style={{width: 600, margin: 50}}>
      <Input 
        value={inputValue} 
        placeholder="请输入列表名称" 
        style={{width: 500, marginBottom: 20}}
        onChange={hanleInputChange}
      ></Input>
      <Button 
        type="primary" 
        style={{float: "right"}}
        onClick={handleButtonClick}
      >提交</Button>
      <List
        style={{width: 500}}
        bordered
        dataSource={list}
        renderItem={(item, index) => (<List.Item onClick={_ => handleItemDelete(index)}>{item}</List.Item>)}
      ></List>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hanleInputChange(e) {
      dispatch(getInputValueAction(e.target.value))
    },
    handleButtonClick() {
      dispatch(addListItem())
    },
    handleItemDelete(index) {
      dispatch(delListItem(index))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
