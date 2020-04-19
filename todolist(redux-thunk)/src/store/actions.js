import axios from 'axios'

export const getInputValueAction = (value) => ({
  type: 'change_input_value',
  value
})

export const addListItem = () => ({
  type: 'add_list_item'
})

export const delListItem = (index) => ({
  type: 'del_list_item',
  index
})

export const initList = (data) => ({
  type: 'init_list',
  data
})


// ===============================

export const getTodoList = _ => {
  return (dispatch) => {
    axios.get('http://rap2.taobao.org:38080/app/mock/251195/list/1234').then(res => {
      dispatch(initList(res.data.array))
    })
  }
}