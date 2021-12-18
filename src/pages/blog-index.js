import * as React from "react"
import { Link, graphql } from "gatsby"

//import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark
  console.log("+++++++++++++",posts.group)

  const test = (arr) => {
      arr.map(item  => {
        if (item.fieldValue != null) {
            return(
                <li key={item.fieldValue}>
                    {item.fieldValue}
                    <ol style={{ listStyle: `none` }}>
                        if (item.group != null) {
                            test(item.group)
                        }
                        else if (item.nodes != null){
                            test(item.nodes)
                        }
                        
                    </ol>
                </li>
            )
        }
        else {
            const title = item.frontmatter.title || item.fields.slug
            return(
                <li key={item.fields.slug}>
                    <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                    >
                        <header>
                            <h2>
                            <Link to={item.fields.slug} itemProp="url">
                                <span itemProp="headline">{title}</span>
                            </Link>
                            </h2>
                            <small>{item.frontmatter.date}</small>
                        </header>
                        <section>
                            <p
                            dangerouslySetInnerHTML={{
                                __html: item.frontmatter.description,
                            }}
                            itemProp="description"
                            />
                        </section>
                    </article>
                </li>
            )
        }
    })
  }
  const theGroup = posts.group
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />

      <ol style={{ listStyle: `none` }}>
        {theGroup.map(post => {
            if (post.group != null) {
            return(<li key={post.fieldValue}>{post.fieldValue}</li>)
            }
        })}
      
      </ol> 
    </Layout>
  )
}

export default BlogIndex

/*
<p>{posts.group[0].fieldValue} ,  {posts.group[0].group[0].fieldValue} , 
      {posts.group[0].group[0].nodes[0].fields.slug} , 
      {posts.group[0].group[0].nodes[0].id} , 
      {posts.group[0].group[0].nodes[0].frontmatter.title} , 
      {posts.group[0].group[0].nodes[0].frontmatter.date} , 
      {posts.group[0].group[0].nodes[0].frontmatter.description} , 
      </p>
*/

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
        group(field: fields___folder) {
        fieldValue
        group(field: frontmatter___mainTag) {
            fieldValue
            nodes {
            fields {
                slug
            }
            id
            frontmatter {
                title
                description
                date
            }
            }
        }
        }
    }
  }
`
