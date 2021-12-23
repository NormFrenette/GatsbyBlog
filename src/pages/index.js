import * as React from "react"
import { graphql } from "gatsby"

//import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BlogIndex from "../components/blogIndex"

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
        
      <div className="with-sidebar">
      <div className="in-sidebar"><BlogIndex/></div>
      <div>Blog content goes here Blog content goes here Blog content goes here 
      Blog content goes here Blog content goes here Blog content goes here Blog content goes here
      Blog content goes here Blog content goes here Blog content goes here
      </div>
    </div>
      
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
