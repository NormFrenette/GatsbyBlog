import * as React from "react"
import { Link } from "gatsby"

function Listing ( {item} ) {
    return(
        <li key={item.fields.slug}>
                <div className="post-list-item">
                    <header>
                        <h6>
                        <Link to={item.fields.slug} itemProp="url">
                            <span>{item.frontmatter.title}</span>
                        </Link>
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
