import * as React from "react"


//import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BlogIndex from "../components/blogIndex"
import { useForm } from "react-hook-form"

export default function ContactPage(location){
  const siteTitle = `Norm's Blog`
  const { register, handleSubmit, formState: {errors}, } = useForm()

  const handlePost = (formData) => {
    console.log("handling submit")
    console.log(formData)
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Contact form" />
        
      <div className="with-sidebar">
      <div className="in-sidebar"><BlogIndex/></div>
        <div>
            <p>Use this form to contact me, especially to request a pcb or ask specific questions etc.
            I will respond by email - and we can take it from there.
            </p>

            <form onSubmit={handleSubmit(handlePost)}>
            <p><label htmlFor="yourname">Name: </label>
            <input 
                id="yourname"
                {...register('name',{ required: true })} 
            />
            {errors.name && (
                <span >
                Please enter your name.
                </span>
            )}
            </p>
            <p>
            <label htmlFor="youremail">email: </label>
            <input 
                id="youremail"
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
            <p>
            <label htmlFor="livetest">
                <p> Homo Sapiens test:<br />
                Which of these has these four has the most fur: snake, banana, fox, beer? </p>
            </label>
            <input
                id="livetest"
                placeholder="enter your answer here"
                {...register('test',{
                    required: true,
                    pattern: /[ ]*(snake|banana|fox|beer)[ ]*/,
                })}
                />
                {errors.test && (
                <span >
                <br />Please verify you are not made of silicon: answer correctly to submit
                </span>
            )}  
            </p>
            <div>
                <button type="submit">Submit</button>
            </div>
            </form>
        </div>
    </div>
      
    </Layout>
  )
}