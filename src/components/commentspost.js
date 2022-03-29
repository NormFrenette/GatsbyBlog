import * as React from "react"
import { useState } from "react"
import axios from "axios"
//import { useStaticQuery, graphql} from "gatsby"


const CommentsPost = ({slug}) => {

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [status,setStatus] = useState(0)
    const slugToSend = slug

    const clearNotify = () => {
        setStatus(0)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var bodyFormData = new URLSearchParams();
        bodyFormData.append('fields[name]', name);
        bodyFormData.append('fields[slug]', slugToSend);
        bodyFormData.append('fields[message]', message);
    
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
            console.log('COMMENT: success')
            console.log('Name:', name)
            console.log('status:', status)
        })
        .catch(function () {
            setStatus(-1)
            console.log('COMMENT: fail')
        });
    }

    return(
        <div className="comments">
        <h3>Comments</h3> 
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
        { status===0 && <form onSubmit={handleSubmit}>
            {/*<input
            name="options[redirect]"
            type="hidden"
            value={"https://normfrenette.com" + post.fields.slug"}
            />*/}
            <p>
            <label htmlFor="fields[message]">Add Your Comment:</label></p>
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
            <button className="greenbutton" type="submit">Submit</button></p>
        </form>}
            
                </div> 

        
        )

}



export default CommentsPost










