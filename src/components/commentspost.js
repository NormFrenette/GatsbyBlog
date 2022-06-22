import * as React from "react"
import { useState } from "react"
import axios from "axios"



const CommentsPost = ({slug,postid}) => {
    const slugToSend = slug
    const postidToSend = postid
    /*const commentdata = useStaticQuery(graphql`
    query {
        allCommentsYaml(sort: {order: ASC, fields: date}, filter: {slug: {eq: $slugToSend}}) {
            nodes {
            message
            name
            slug
            date
         }
        }
    }
    `)*/

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [status,setStatus] = useState(0)
    const [submitted,setSubmitted] = useState(false)
    

    const clearNotify = () => {
        setStatus(0)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)
        var bodyFormData = new URLSearchParams();
        bodyFormData.append('fields[name]', name);
        bodyFormData.append('fields[slug]', slugToSend);
        bodyFormData.append('fields[postid]', postidToSend);
        bodyFormData.append('fields[message]', message);
        console.log("SLUGTOSEND=",slugToSend)
        console.log("POSTIDTOSEND",postidToSend)

        axios({
            method: 'POST',
            url:
            "https://nf-heroku-staticman.herokuapp.com/v3/entry/github/NormFrenette/GatsbyBlog/main/comments",
            data: bodyFormData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .then(function () {
            setStatus(1)
            setName("")
            setMessage("")
            setSubmitted(false)
            console.log('COMMENT: success')
            console.log('Name:', name)
            console.log('status:', status)
        })
        .catch(function () {
            setStatus(-1)
            setSubmitted(false)
            console.log('COMMENT: fail')
        });
    }



    return(
        <div>
        { status>0 && <div className="commentsSuccess"> 
            <p>Thanks you for submitting a comment. </p>
            <p>It should be processed and displayed within a few minutes.<br />
            You can refresh the page to see it then.</p>
            <p><button  onClick={clearNotify}>OK</button></p>
        </div>}
        { status<0 && <div className="commentsFail">
            <p><strong>Sorry! Your comment was rejected by the Spam Filter!</strong></p>
            <p>Please feel free to edit and re-submit.<br />
            Note that most links cause rejection (if you posted one).</p>
            <p><button  onClick={clearNotify}>OK</button></p>
        </div>}
        { status===0 && <form onSubmit={handleSubmit} className="commentForm">
            {/*<input
            name="options[redirect]"
            type="hidden"
            value={"https://normfrenette.com" + post.fields.slug"}
            />*/}
            <p>
            <label htmlFor="fields[message]"><strong>Add a Comment:</strong></label></p>
            <div style={{"width" : "100%"}}>
                <textarea
                    rows="6"
                    style={{"width" : "100%"}}
                    required
                    placeholder="enter comment here"
                    value={message}
                    onChange={event =>setMessage(event.target.value)} 
                ></textarea>
            </div>
            <p>
            <label htmlFor="fields[name]" >Name:</label>
            <br />
            <input type="text" 
                id="fields[name]"
                value={name}
                onChange={event =>setName(event.target.value)} 
                required/>
            </p>
            <p>
            {submitted ?
            <span><button  type="submit" disabled>Submit </button>
            <span className="submitMessage"> ... Please wait - processing your comment ...</span></span> :
            <button className="greenbutton" type="submit" >Submit </button>}</p>
        </form>}
            
                </div>         
        )

}

export default CommentsPost










