import React, { useState, useEffect } from 'react';

const usePerson = (id) => {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState({})
  useEffect(() => {
    setLoading(true);
    fetch(`http://rap2api.taobao.org/app/mock/251195/list/${id}/`)
      .then(res => res.json())
      .then(data => {
        setPerson(data)
        setLoading(false)
      })
  }, [id])
  return [loading, person]
}

const Person = ({ id }) => {
  const [loading, person] = usePerson(id)

  if (loading === true) {
    return <p>Loading ...</p>
  }

  return (
    <div>
      <p>{person.title}</p>
    </div>
  )
}

export default function App() {
  const [show, setShow] = useState('1')

  return (
    <div>
      <Person id={show} />
      <div>
        <button onClick={_ => setShow('1')}>第一页</button>
        <button onClick={_ => setShow('2')}>第二页</button>
      </div>
    </div>
  )
}