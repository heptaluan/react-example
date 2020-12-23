import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({ hits: [] })
  const [query, setQuery] = useState('redux')

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://hn.algolia.com/api/v1/search?query=${query}`)
      setData(result.data)
    }
    fetchData()
  }, [query])

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App