import { withRouter } from 'next/router'
import Layout from '../components/layout'
import './post.scss'

const Page = withRouter(props => {
  return (
    <Layout>
      <h3 className="header">Post Page</h3>
      <p>Info: {props.router.query.title}</p>
    </Layout>
  )
})

export default Page