import * as React from "react"
import { useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BlogIndex from "../components/blogIndex"
import { useForm } from "react-hook-form"

export default function ContactPage(location){
  const siteTitle = `Norm's Blog`
  const { register, handleSubmit, formState: {errors}, reset, } = useForm()
  const [submitted,setSubmitted] = useState(false)
  const [wrongTest,setWrongTest] = useState(false)
  const [wasSent,setWasSent] = useState('')

  const handlePost = (data) => {
    setSubmitted(false)
    setWrongTest(false)
    fetch(`.netlify/functions/form`, {
        method: `POST`,
        body: JSON.stringify(data),
        headers: {
          "content-type": `application/json`,
        },
      })
        .then(res => res.json())
        .then(body => {
            console.log(`response from API:`, body)
            if (body === "ok") {
                console.log(`response from API - OK:`, body)
                reset()
                setWasSent(data)
                setSubmitted(true)
            }
            else if (body === "invalid") {
                setWrongTest(true)
            }
            else {
                console.log(`error sending: `,body)
            }
        })
    }

  return (
    <Layout copyrightdate="2021" location={"contact"} title={siteTitle}>
      <Seo title="Contact form" />
        
      <div className="with-sidebar">
      <div className="in-sidebar"><BlogIndex/></div>
        <div>
            <h3 id="sectionTop">Contact me</h3>
            {submitted &&<div className="topAndBottom" ><p className = "blue">Thank you for reaching out!</p>
            <p  className = "blue">The following message was sent to Norm:</p>
            <p>From: {wasSent["name"]}<br />
            Email: {wasSent["email"]}<br />
            Message:<br />{wasSent["message"]}</p>
            <p  className = "blue">You should get an email from him shortly.</p></div>}

            {wrongTest && <div className="topAndBottom red" ><p>Sorry!!!</p>
                <p>hmmm... the most fur?  please check...</p></div>}


            <p>Send me a message, especially if you are requesting a pcb or 
                have specific questions you would like me to address.  
            I will respond by email - and we can take it from there.
            </p>

            <form className="contactform" onSubmit={handleSubmit(handlePost)}>
            <p><label htmlFor="yourname">Your Name: </label>
            <input 
                id="yourname"
                size="40"
                {...register('name',{ required: true })} 
            />
            {errors.name && (
                <span >
                Please enter your name.
                </span>
            )}
            </p>
            <p>
            <label htmlFor="youremail">Your email: </label>
            <input 
                id="youremail"
                size="40"
                {...register('email',{ required: true,
                    pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                })} 
            />
            {errors.email && (
                <span >
                Please enter your email.
                </span>
            )}
            </p>
            <p>
            <label htmlFor="yourmsg">Message:
            <br/></label>
            <textarea rows="5" 
                style={{"width" : "100%"}} 
                id="yourmsg"
                {...register('message')} 
            />
            
            </p>

            <label htmlFor="livetest">
                <p style={{"marginBottom" : "4px"}}> Homo Sapiens test:</p>
                <p className="indent-this" style={{"marginBottom" : "7px"}}>
                    <strong>Which of the following has the most fur:</strong>  snake, banana, lion, beer ?</p>
            </label>
            <p>
            <input className="indent-this"
                id="livetest"
                placeholder="enter your answer here"
                {...register('test',{
                    required: true,
                    pattern: /(snake|banana|lion|beer)/i,
                })}
                />
                {errors.test && (
                <span >
                <br />Please verify you are not made of silicon: answer correctly to submit
                </span>
            )}  
            </p>

            <div>
                <p >
                <button className="greenbutton" style={{"marginTop" : "14px"}}type="submit">Submit</button></p>
            </div>
            </form>
        </div>
    </div>
      
    </Layout>
  )
}