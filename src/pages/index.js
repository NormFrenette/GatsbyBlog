import * as React from "react"
import { useCallback, useState } from "react"
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
                        <h5 style={{marginTop: 21, marginBottom: 12, color: '#005b99'}}>
                        <Link to={item.fields.slug} itemProp="url">
                            <span itemProp="headline">{item.frontmatter.title}</span>
                        </Link>
                        </h5>
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

function LiToggle ( {id,inserted}) {
    const [state, setState] = useState(false);
    
    return( 
        <li key={id} style={{marginBottom: 21, fontSize: '1.25rem'}}>
        <button style={{padding: '0', border: '0'}} onClick={() => setState(!state)}>{state ? '-' : '+'}</button> {id}
        {<Menu a={inserted} isTop={state}/>}
        </li>
    )

}
/*
{a.map((post) => (
            post.group ?<li key={post.fieldValue}>{post.fieldValue} 
            {<Menu a={post.group} isTop={false}/>}</li> :
                post.nodes ?<li key={post.fieldValue}>{post.fieldValue} 
                {<Menu a={post.nodes} isTop={false}/>}</li> :
                <Listing item={post} />
        ))}
        */

function Menu( {a,isTop=true} ) {

    return(
        <ul style={{listStyleType: "none"}} className={`${isTop ? 'is-visible': 'is-not-visible' }`}>
        {a.map((post) => (
            post.group ?<LiToggle id={post.fieldValue} inserted={post.group} /> :
                post.nodes ?<LiToggle id={post.fieldValue} inserted={post.nodes} />:
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
                date(formatString: "MMMM DD, YYYY")
            }
            }
        }
        }
    }
  }
`
