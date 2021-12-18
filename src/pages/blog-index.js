import * as React from "react"
import { Link, graphql } from "gatsby"

//import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark

function Listing ( {item} ) {
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
                            <span itemProp="headline">{item.frontmatter.title}</span>
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

function Menu( {a} ) {
    return(
        <ul>
        {a.map((post) => (
            post.group ?<li key={post.fieldValue}>{post.fieldValue}
            {<Menu a={post.group}/>}</li> :
                post.nodes ?<li key={post.fieldValue}>{post.fieldValue}
                {<Menu a={post.nodes}/>}</li> :
                <Listing item={post} />
        ))}
        </ul>
    );
}


  const theGroup = posts.group
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
        
      <Menu a={theGroup}/>
      
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
