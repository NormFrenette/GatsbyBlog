import * as React from "react"
import { useState } from "react"
import { useStaticQuery, graphql} from "gatsby"
import Listing from "./listing"

const BlogIndex = (postId="") => {
    
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark (sort: {fields: [frontmatter___appearOrder], order: [ASC]}) {
                group(field: fields___folder) {
                    fieldValue
                    group(field: frontmatter___mainTag) {
                        fieldValue
                        distinct(field: id)
                        nodes {
                            fields {
                                slug
                            }
                            id
                            frontmatter {
                                title
                                description
                                date(formatString: "MMMM DD, YYYY")
                                appearOrder
                            }
                        }
                    }
                }
            }
        }
        `)



    function fixSort(qData) {
        //this is not robust in that the structure must be like Looper - How-To-Use - User Guide
        //meaning there has to be three levels - which is how the blog is constructed.
        let myPosts = qData.allMarkdownRemark
        console.log("posts",myPosts)
        for (let i = 0; i < myPosts.group.length; i++) {
            //first level: fieldValue = Looper etc.
            console.log("top",myPosts.group[i].fieldValue)
            for (let j = 0; j <myPosts.group[i].group.length; j++) {
            //     //second level: field value = How-to-Use etc.
                console.log(myPosts.group[i].group[j].fieldValue)
                myPosts.group[i].group[j].nodes.sort((a,b) => parseInt(a.frontmatter.appearOrder) - parseInt(b.frontmatter.appearOrder));
            }
            myPosts.group[i].group.sort((a,b) => parseInt(a.nodes[0].frontmatter.appearOrder) - parseInt(b.nodes[0].frontmatter.appearOrder));
        }
        myPosts.group.sort((a,b) => parseInt(a.group[0].nodes[0].frontmatter.appearOrder) - parseInt(b.group[0].nodes[0].frontmatter.appearOrder));
        return(myPosts)
    }

    const posts = fixSort(data)
//<div key={catName+id}>
    

    const LiToggle =  ( {id,catName,inserted,initialState}) => {
        const [state, setState] = useState(initialState);
        console.log("LiToggle",state,id,catName)
        return( 
            <li key={id+catName} style={{fontSize: '0.9rem'}}>      
            <button style={{padding: '0', border: '0'}} onClick={() => setState(!state)}>{state ? '-' : '+'}</button> 
            <span role="menuitem" ariaHidden={true} onClick={() => setState(!state)}>&nbsp;{catName}</span>
            {<Menu a={inserted} show={state}/>}
            </li>
        )

    }

    function checkIfIDInNodes(nodes) {
        var postExists = false
        for (var i = 0; i < nodes.length; i++){
            if (nodes[i].id === postId.postId) {
                postExists = true
                break
            }
        }
        return postExists
    }

    //key = {a[0].group? "ul-"+a[0].group.fieldValue: "ul-"+a[0].id}
    function Menu( {a,show = true} ) {
        return(
            <ul 
            style={{listStyleType: "none"}} className={`${show ? 'is-visible': 'is-not-visible' }`}>
            {a.map((post) => (
                post.group ?<LiToggle id={post.fieldValue} catName={post.fieldValue} inserted={post.group} initialState={true}/> :
                    post.nodes ?
                        ((checkIfIDInNodes(post.nodes))?
                        <LiToggle id={post.distinct[0]} catName={post.fieldValue} inserted={post.nodes} initialState={true} />:
                        <LiToggle id={post.distinct[0]} catName={post.fieldValue} inserted={post.nodes} initialState={false} />):
                    <Listing item={post} onID={postId.postId} />
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