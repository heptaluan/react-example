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

export const getInitList = _ => ({
  type: 'get_init_list'
})