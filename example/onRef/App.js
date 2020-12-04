import React, { Component } from 'react'
import Child from './Child'

class App extends Component {
  handleParentClick = (ref) => {
    console.log(ref.state.name)
    ref.click()
  }
  render() {
    return (
      <div>
        <Child onRef={this.handleParentClick} />
      </div>
    )
  }
}

export default App