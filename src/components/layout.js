import * as React from "react"
//import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  //        <Link to="/">{title}</Link>  replaced by the <a tag below
  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <a href="/">{title}</a>
      </h1>
    )
  } else {
    //<Link className="header-link-home" to="/">{title}</Link>
    header = (
      <a className="header-link-home" href="/">{title}</a>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
