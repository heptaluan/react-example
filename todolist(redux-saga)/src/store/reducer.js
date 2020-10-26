const defaultState = {
  inputValue: '',
  list: []
}

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {

    case 'init_list':
      newState.list = action.data
      return newState

    case 'change_input_value':
      newState.inputValue = action.value
      return newState

    case 'add_list_item':
      newState.list.push(newState.inputValue)
      newState.inputValue = ''
      return newState

    case 'del_list_item':
      newState.list.splice(action.index, 1)
      return newState

    default:
      break;
  }
  return state
}