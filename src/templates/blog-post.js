import * as React from "react"
import { Link, graphql } from "gatsby"

import BlogIndex from "../components/blogIndex"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="with-sidebar">
        <div className="in-sidebar"><BlogIndex postId={post.id}/></div>
        <div>
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              <h1 itemProp="headline">{post.frontmatter.title}</h1>
              <p>{post.frontmatter.date}</p>
            </header>
            <section
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp="articleBody"
            />
            <hr />
            <footer>
              {/* <Bio />  */}
            </footer>
          </article>
          <nav className="blog-post-nav">
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
          <div className="comments">
            <h3>Comments</h3> 
            <form method="POST" 
            action="https://nf-heroku-staticman.herokuapp.com/v3/entry/github/NormFrenette/GatsbyBlog/main/comments">
              <input name="fields[slug]" type="hidden" value={post.fields.slug}/>
              <input
                name="options[redirect]"
                type="hidden"
                value={"https://normfrenette.com" + post.fields.slug}
                />
              <p>
              <label htmlFor="fields[message]">Add Your Comment:</label></p>
              <div style={{"width" : "100%"}}>
              <textarea
                  id="Message"
                  rows="6"
                  style={{"width" : "100%"}}
                  className="form-control"
                  name="fields[message]"
                  required
                  placeholder="enter comment here"
                ></textarea>
              </div>
                
                <p><label htmlFor="fields[name]" >Name:</label><br />
              <input id="fields[name]" name="fields[name]" type="text" required/></p>
              <p>
              <button type="submit">Submit</button></p>
            </form>
            
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      fields {
        slug
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
