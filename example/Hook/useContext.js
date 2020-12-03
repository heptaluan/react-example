import React, { useContext } from 'react';

const AppContext = React.createContext({})

const A = () => {
  const { title } = useContext(AppContext)
  return (
    <div>
      <p>标题为 { title }</p>
      <p>A 组件的内容</p>
    </div>
  )
}

const B = () => {
  const { title } = useContext(AppContext)
  return (
    <div>
      <p>标题为 { title }</p>
      <p>B 组件的内容</p>
    </div>
  )
}

export default function App() {
  return (
    <AppContext.Provider value={{title: 'lisi'}}>
      <A></A>
      <B></B>
    </AppContext.Provider>
  )
}