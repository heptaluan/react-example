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
      <SubLink title="111"></SubLink>
      <SubLink title="222"></SubLink>
      <SubLink title="333"></SubLink>
    </Layout>
  )
}