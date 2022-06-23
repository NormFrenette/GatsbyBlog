import * as React from "react"
import { Link, graphql } from "gatsby"
import CommentsPost from "../components/commentspost"
import BlogIndex from "../components/blogIndex"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  
  function Comments ({nodes}) {
    return (
        <div className="commentsContainer">
           <h4>Comments</h4> 
        {nodes.map((node) => (
            <div className="singleComment">
                <span className="commentName">{node.name}</span> - 
                <small>{new Date(node.date * 1000).toLocaleString()}</small>
                <p className="commentMessage">{node.message}</p>
            </div>
        ))}
        </div>
    )
}

  return (
    <Layout copyrightdate={post.frontmatter.date.split(" ").pop()} location={location} title={siteTitle}>
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
              <h1 id="sectionTop" itemProp="headline">{post.frontmatter.title}</h1>
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
          <Comments nodes={data.allCommentsYaml.nodes} />
          <div><CommentsPost slug={post.fields.slug} postid={post.id}/></div>
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
    $slug: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    allCommentsYaml(
      sort: {order: ASC, fields: date}
       filter: {slug: {eq: $slug}}
       ) 
       {
        nodes {
          name
          message
          date
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
