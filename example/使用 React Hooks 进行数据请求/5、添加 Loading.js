import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({ hits: [] })
  const [query, setQuery] = useState('redux')
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=redux')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const result = await axios(url)
      setData(result.data)
      setIsLoading(false)
    }
    fetchData()
  }, [url])

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
          <ul>
            {data.hits.map(item => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        )}
    </>
  )
}

export default App