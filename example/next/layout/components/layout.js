import Header from './header'
import Footer from './footer'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1xp solid #ddd'
}

const Layout = props => {
  return (
    <div style={layoutStyle}>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </div>
  )
}

export default Layout