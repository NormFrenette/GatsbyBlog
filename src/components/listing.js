import * as React from "react"
//import { Link } from "gatsby"

//<Link to={item.fields.slug} itemProp="url"><span>{item.frontmatter.title}</span></Link>
function Listing ( {item} ) {
    return(
        <li key={item.fields.slug}>
                <div className="post-list-item" key={item.id}>
                    <header>
                        <h6>
                        <a  href={item.fields.slug}>{item.frontmatter.title}</a>
                        </h6>
                        <p className="blog-date">{item.frontmatter.date}</p>
                    </header>
                    <section>
                        <p
                        dangerouslySetInnerHTML={{
                            __html: item.frontmatter.description,
                        }}
                        />
                    </section>
                </div>
            </li>
    )
}

export default Listing
