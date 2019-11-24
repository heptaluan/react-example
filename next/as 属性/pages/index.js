import Link from 'next/link'
import Layout from '../components/layout'

const SubLink = props => {
  return (
    <li>
      <Link as={`p/${props.as}`} href={`/post?title=${props.title}`}>
        <a>{props.title}</a>
      </Link>
    </li>
  )
}

export default _ => {
  return (
    <Layout>
      <h2>Infomation</h2>
      <SubLink as="one-page" title="11111" />
      <SubLink as="two-page" title="22222" />
      <SubLink as="three-page" title="33333" />
    </Layout>
  )
}