import * as React from "react"
import { useState } from "react"
import axios from "axios"
//import { useStaticQuery, graphql} from "gatsby"


const CommentsPost = ({slug}) => {

        const [name, setName] = useState("");
        const [message, setMessage] = useState("");
        const slugToSend = slug
    
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
        console.log('COMMENT: success')
        })
        .catch(function () {
        console.log('COMMENT: fail')
        });
    }

    return(
        <div className="comments">
        <h3>Comments</h3> 
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Submit</button></p>
        </form>
            
                </div> 

        
        )

}



export default CommentsPost










