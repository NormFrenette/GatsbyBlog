import * as React from "react"
import { Link } from "gatsby"

function Listing ( {item} ) {
    return(
        <li key={item.fields.slug}>
                <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
                >
                    <header>
                        <h6>
                        <Link to={item.fields.slug} itemProp="url">
                            <span itemProp="headline">{item.frontmatter.title}</span>
                        </Link>
                        </h6>
                        <p className="blog-date">{item.frontmatter.date}</p>
                    </header>
                    <section>
                        <p
                        dangerouslySetInnerHTML={{
                            __html: item.frontmatter.description,
                        }}
                        itemProp="description"
                        />
                    </section>
                </article>
            </li>
    )
}

export default Listing
