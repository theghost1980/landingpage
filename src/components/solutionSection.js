import React from 'react';
//graphql
import { graphql, useStaticQuery } from 'gatsby';

const SolutionSection = () => {

    const data = useStaticQuery(
        graphql`
          query {
            solutions: allDatoCmsSolution(limit: 3) {
                edges {
                    node {
                        descriptionNode {
                            childMarkdownRemark {
                                html
                            }
                        }
                        id
                        title
                        solutionImage {
                            alt
                            fluid {
                                src
                            }
                        }
                    }
                }
            }
            logoSVGWhite: file(relativePath: {eq: "logo-white.svg"}) {
                publicURL
                extension
                id
            }
          }
        `
    )

    const solutions = data.solutions.edges;

    return (
        <section id="solutions">
            <ul className={"ulHorizontal"}>
            {
                solutions.map(({node: solution}) => {
                return (
                    <li key={solution.id} className="liItem solutionLi">
                    <div className="solutionCont">
                        <div className="solutionImgCont">
                            <img src={data.logoSVGWhite.publicURL} className="imgLogoSVG" alt="Our solution is the Best" />
                            <img src={solution.solutionImage.fluid.src} alt={solution.solutionImage.alt} className="imgSolution" />
                        </div>
                        <div className="solutionContentCont">
                            <h3 className="subHeading">{solution.title}</h3>
                            <div className="readingText paragraphFont"
                            dangerouslySetInnerHTML={{
                                __html: solution.descriptionNode.childMarkdownRemark.html
                            }}
                            />
                        </div>
                    </div>
                    </li>
                )
                })
            }
        </ul>
      </section> 
    )
}

export default SolutionSection;