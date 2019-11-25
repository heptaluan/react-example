import Link from 'next/link'
import Layout from '../components/layout'

const SubLink = props => {
  return (
    <li className="list">
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

      {/* 在这个标签内声明的样式只能覆盖当前组件，子组件是不会出现层叠效果的 */}
      <style jsx>{`
        h2 {
          font-family: 'Arial';
        }
      `}</style>

      {/* 
        而 <style jsx global> 标签的效果则是和标准的 CSS 层叠效果一致
        在这个标签中声明的样式会影响到子组件
      */}
      <style jsx global>{`
        .list {
          list-style: none;
          margin: 5px 0;
        }
      `}</style>
    </Layout>
  )
}