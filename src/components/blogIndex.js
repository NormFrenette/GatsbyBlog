import * as React from "react"
import { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Listing from "./listing"

const BlogIndex = () => {

    const data = useStaticQuery(graphql`
        query {
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
        `)

    const posts = data.allMarkdownRemark

    function LiToggle ( {id,inserted,initialState}) {
        const [state, setState] = useState(initialState);
        
        return( 
            <li key={id} style={{fontSize: '0.9rem'}}>
            <button style={{padding: '0', border: '0'}} onClick={() => setState(!state)}>{state ? '-' : '+'}</button> {id}
            {<Menu a={inserted} isTop={state}/>}
            </li>
        )

    }

    function Menu( {a,isTop=true} ) {

        return(
            <ul style={{listStyleType: "none"}} className={`${isTop ? 'is-visible': 'is-not-visible' }`}>
            {a.map((post) => (
                post.group ?<LiToggle id={post.fieldValue} inserted={post.group} initialState={true} /> :
                    post.nodes ?<LiToggle id={post.fieldValue} inserted={post.nodes} initialState={false} />:
                    <Listing item={post} />
            ))}
            </ul>
        );
    }

    const theGroup = posts.group

    return (
        <Menu a={theGroup}/>
    )
}

export default BlogIndex