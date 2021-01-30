import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
//components
import ArtDirector from './artDirector';
import Img from 'gatsby-image';
import BtnLanding from '../components/btnLanding';

const Buybgsection = () => {

  const data = useStaticQuery(
    graphql`
      query {
        buySection: datoCmsBuySection {
            contentNode {
                childMarkdownRemark {
                    html
                }
            }
            id
            heading
            product {
                title
                descriptionNode {
                    childMarkdownRemark {
                        html
                    }
                }
                id
                featured
                price
                image {
                    fluid {
                        ...GatsbyDatoCmsFluid
                    }
                }
            }
        }
        bgBuySectionData: allDatoCmsBuySectionBackground(filter: {featured: {eq: true}}) {
            totalCount
            edges {
                node {
                    featured
                    id
                    titleBackgroundBuySection
                    backgroundBuyContainer {
                        backgroundPosition
                        breakpoint
                        breakpointName
                        fixed
                        id
                        heroBackground {
                            url
                        }
                    }
                }
            }
        }
      }
    `
  )
  function dataImgBg(){
    //check if an image feature has been set on Hero section, otherwise error presented by console.
    try {
      if(data.bgBuySectionData.totalCount === 0 || data.bgBuySectionData.totalCount > 1){ throw new Error('Featured not Assinged or assigned more than 1') };
      let ArtDirectorData = data.bgBuySectionData.edges.find(({ node: item }) => item.featured === true)
        .node.backgroundBuyContainer;
    //   console.log(ArtDirectorData);

      return ArtDirectorData;

    } catch (error) {
      alert('Possible error con template configuration \nPlease take a look at the console ->');
      console.log(error);
      console.log("===Configuration Error on template===");
      console.log("Possible Error #1: It looks like you haven't set a featured Img on DatoCMS > buy section background > featured");
      console.log("Possible Error #2: It may be more than 1 buy section background img selected as featured, the system will bring the first occurence.");
      console.log("===End Error on template===");
    }
  }

function findFeatured(){
    try {
        // const _data = data.heroBG.coverImageGallery.find(item => item.featuredImage === true).coverImage.fluid;
        const _data = data.buySection.product.find(item => item.featured === true);
        if(_data === null || _data === undefined){ throw new Error('Testing throw errors') };
        return _data

    } catch (error) {
        alert('Possible error con template configuration \nPlease take a look at the console ->');
        // console.log(error);
        console.log("===Configuration Error on template===");
        console.log("Possible Error #1: It looks like you haven't set a featured Product on DatoCMS > buy section > product > product item > featured");
        console.log("===End Error on template===");
    }
}

const _data = data.buySection;
const featuredProduct = findFeatured();

// console.log(featuredVideo);
//<iframe width="560" height="315" src="https://www.youtube.com/embed/_DYAnU3H7RI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  return (
    <div className="buyBgSectionCont" id="buy">
        <ArtDirector
            artDirectorData={dataImgBg()}
            source={"buyBg"}
        >
            <div className="buySectionContentContainer">
                <div className="contentBuySectionCont">
                    <h1 className="contrastTitle heading specialShadows">{_data.heading}</h1>
                    <div id="buyMainContentContainer" className="contrastText readingText paragraphFont"
                        dangerouslySetInnerHTML={{
                            __html: _data.contentNode.childMarkdownRemark.html
                        }}
                    />
                </div>
                <div className="contentProductCont">
                    <div className="imgProductContainer">
                        <Img fluid={featuredProduct.image.fluid} className="imgProduct"/>
                    </div>
                    <div className="innerContentProduct">
                        <h2 className="contrastTitle subHeading">{featuredProduct.title} Just for ${featuredProduct.price}</h2>
                        {/* <div className="contrastText"
                            dangerouslySetInnerHTML={{
                                __html: featuredProduct.descriptionNode.childMarkdownRemark.html
                            }}
                        /> */}
                        <div className="btn250x60">
                            <BtnLanding typeBtn={"filled"} highContrast={"highContrast"}>Buy</BtnLanding>
                        </div>
                    </div>
                </div>
            </div>
        </ArtDirector>
    </div>
  )
}

export default Buybgsection;