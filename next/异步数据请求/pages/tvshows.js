import Layout from '../components/layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const TvShow = (props) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({ show }) => (
        <li key={show.id}>
          <Link href={`/tv?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

TvShow.getInitialProps = async function () {
  // context是衔接Next.js包装组件和自定义主键的上下文，包含的参数有asPath、pathname、query
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()
  return {
    shows: data
  }
}

export default TvShow