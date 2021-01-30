import React from 'react';
//graphql
import { graphql, useStaticQuery } from 'gatsby';
//components
import Img from 'gatsby-image';

const Trustsection = () => {

    const data = useStaticQuery(
        graphql`
          query {
            testimonials: datoCmsTrustSection {
                contentNode {
                    childMarkdownRemark {
                        html
                    }
                }
                trustItem {
                    imageLogo {
                        fluid {
                            ...GatsbyDatoCmsFluid
                        }
                    }
                    id
                    testimonialNode {
                        childrenMarkdownRemark {
                            html
                        }
                    }
                }
            }
          }
        `
    )

    const trust = data.testimonials;

    return (
        <div className="trustSectionContainer" id="trust">
            <div className="trustContent readingText paragraphFont"
                dangerouslySetInnerHTML={{
                __html: trust.contentNode.childMarkdownRemark.html
                }}
            />
            <ul className="ulHorizontal">
                {
                trust.trustItem.map(itemTrust => {
                    // console.log(itemTrust);
                    return (
                    <li key={itemTrust.id} className="liItem">
                        <div className="imgTrustContainer">
                            <Img fluid={itemTrust.imageLogo.fluid} className="imgTrust" />
                        </div>
                    </li>
                    )
                })
                }
            </ul>
        </div>
    )
}

export default Trustsection;