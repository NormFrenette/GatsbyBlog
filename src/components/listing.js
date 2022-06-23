import * as React from "react"
//import { Link } from "gatsby"

//<Link to={item.fields.slug} itemProp="url"><span>{item.frontmatter.title}</span></Link>
function Listing ( {item,onID=""} ) {
    const classNameIsSelected = (onID===item.id)? "post-list-item post-selected":"post-list-item"
    const hrefToId = "#sectionTop"
    return(
        <li key={item.fields.slug}>
                <div className={classNameIsSelected} key={item.id} >
                    <header>
                        <h6>
                        <a  href={item.fields.slug+hrefToId}>{item.frontmatter.title}</a>
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
