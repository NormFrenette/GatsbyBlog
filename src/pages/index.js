import * as React from "react"
import { graphql } from "gatsby"

//import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BlogIndex from "../components/blogIndex"

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
        
      <div className="with-sidebar">
      <div className="in-sidebar"><BlogIndex/></div>
        <div>
          <h4>Welcome to my blog</h4>
          <p>I'm publishing notes about what I learned - in case it can help others. I try to write them 
            as comprehensively as possible, for people who are just starting.</p>
          <p> I publish instruction on how to build my projects - electronics, or code, or both. 
            and provide links to the code - if it runs on raspberry pi.</p>
          <p>I also provide screen shots and user guides for the ios apps I develop.</p>
          <blockquote>Note: I just started posting in December 2021... 
            It might take a little while to get all my notes and projects on here.</blockquote>

        <h5>How this came about...</h5>
        <p>Having accumulated enough years of working, I took a break when Covid hit. It was going to be a one-year  "sabatical" 
          ... but so far, I'm still on "sabatical"</p>
        <h5>What am I doing?</h5>
        <p>I focussed on electronics projects and some software goals I wanted to hit - 
          like writing an IOS app or creating Raspberry Pi powered devices.</p>
          <p>Lucky for me - physics and electronics were just as I left them 30 years ago, so I could dust off my old 
            Tecktronics 465B Oscilloscope to investigate how dirty the power supply of a raspberry pi 
            can be when trying to build audio circuits...</p>
        <h5>Software, on the other hand:</h5>
        <p>  Software has changed, since I last wrote web applications in the early 2000's
          <i>(or programs in the 1980's - but let's not go there).</i>.</p>
        <ul className="indent-this">
          <li>Python went from version to 3 - and alsmost nobody is writing new stuff in python 2</li>
          <li>IOS introduced Swift and SwiftUI - and it's early enough that very IOS version changes things...</li>
          <li>Relying on Other people's software: So many people now just use libraries to do stuff - 
            Hard for me to conform to this somewhat blindly, when my first language was Fortran on punch cards...</li>
        </ul>
        <p> And then I had to learn some new things - because of the choices I made:</p>
        <ul className="indent-this">
          <li> I finally said goodbye to windows and boought me a MacBook Pro as my platform for writing code</li>
          <li> I found a copy of "UNIX in a nutshell" - and became somewhat proficient in the Raspbian world of Raspberry Pi</li>
          <li> I learned that linux always has new things popping up very 10 years or so, like DBus and SystemdD, 
            while others remain arcane and obscure like alsa audio...</li>
        </ul>
        <h5>Why publish my notes?</h5>
        <p>If you are very new to something, or have been away for quite long, instructions and examples on the web can be cryptic.
          Don't get me wrong - without stack overflow, it would have taken much longer.  However, the experts who freely share their knowledge on the web, 
          have all but forgotten that some of the things they know that are so obvious to them. 
          Hence, they no longer think of defining them.
        </p>
        <p>I am rarely content to only copy code examples to solve a problem. I want to understand why it does what it does.
          This means, tracking down concepts or digging into explanations - which often are difficult to comprehend because 
          the most basic principles, unknown to me - the new guy - are not explained.  Of course, these principles are defined on the web 
          - just not always easy to find.
        </p>
        <p>So I resolved to write down my learning process.  I want to pay particular attention to the things that appear obvious to those who already know them.  I hope I succeed in helping out those who will read 
          this blog in search of comprehensive guides, instructions etc.</p>
        </div>
    </div>
      
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
