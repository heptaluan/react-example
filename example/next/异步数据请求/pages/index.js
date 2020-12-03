import Link from 'next/link'
import Layout from '../components/layout'

const SubLink = props => {
  return (
    <li>
      <Link href={`/post?title=${props.title}`}>
        <a>{props.title}</a>
      </Link>
    </li>
  )
}

export default _ => {
  return (
    <Layout>
      <h2>Infomation</h2>
      <SubLink title="11111" />
      <SubLink title="22222" />
      <SubLink title="33333" />
      <Link href={`/tvshows`}>
        <a style={{ marginTop: 20, display: 'inline-block' }}>Go Shows</a>
      </Link>
    </Layout>
  )
}