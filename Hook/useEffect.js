import React, { useState, useEffect } from 'react';

const Book = ({ id }) => {
  const [loading, setLoading] = useState(true)
  const [book, setBook] = useState({})

  useEffect(() => {
    setLoading(true);
    fetch(`http://rap2api.taobao.org/app/mock/251195/list/${id}/`)
      .then(res => res.json())
      .then(data => {
        setBook(data)
        setLoading(false)
      })
  }, [id])

  if (loading === true) {
    return <p>Loading ...</p>
  }

  return (
    <div>
      <p>{book.title}</p>
    </div>
  )
}

export default function App() {
  const [show, setShow] = useState('1')

  return (
    <div>
      <Book id={show} />
      <div>
        <button onClick={_ => setShow('1')}>第一页</button>
        <button onClick={_ => setShow('2')}>第二页</button>
      </div>
    </div>
  )
}