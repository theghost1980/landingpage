import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
//components
import ArtDirector from './artDirector';
import Btnlanding from './btnLanding';

const Herobackgroundsection = () => {
  const data = useStaticQuery(
    graphql`
      query {
        hero: datoCmsHeroSection {
          heroHeading
          heroSubHeading
        }
        bgHeroData: allDatoCmsHeroBackgroundImage(filter: {featured: {eq: true}}) {
          edges {
            node {
              id
              featured
              resolutionsBackground {
                breakpoint
                breakpointName
                id
                backgroundPosition
                fixed
                heroBackground {
                  width
                  url
                }
              }
            }
          }
          totalCount
        }
      }
    `
  )

  function dataImgBg(){
    //check if an image feature has been set on Hero section, otherwise error presented by console.
    try {
      if(data.bgHeroData.totalCount === 0 || data.bgHeroData.totalCount > 1){ throw new Error('Featured not Assinged or assigned more than 1') };
      let ArtDirectorData = data.bgHeroData.edges.find(({ node: item }) => item.featured === true)
          .node.resolutionsBackground;
          // console.log(ArtDirectorData);
      return ArtDirectorData;
    } catch (error) {
      alert('Possible error con template configuration \nPlease take a look at the console ->');
      console.log(error);
      console.log("===Configuration Error on template===");
      console.log("Possible Error #1: It looks like you haven't set a featured Img on DatoCMS > hero background image > featured");
      console.log("Possible Error #2: It may be more than 1 hero background img selected as featured, the system will the first occurence.");
      console.log("===End Error on template===");
    }
  }

  return (
    <div className="heroBgSectionCont" id="welcome">
      <ArtDirector
        artDirectorData={dataImgBg()}
        source={"heroBg"}
      >
      <div className="contentHeroContainer width50">
        <h1 className="contrastTitle titleHero heading">{data.hero.heroHeading}</h1>
        <h2 className="contrastTitle subHeading specialShadows">{data.hero.heroSubHeading}</h2>
        <div className="btn250x60">
          <Btnlanding typeBtn="filled" highContrast={"highContrast"}>Click me please!</Btnlanding>
        </div>
      </div>
    </ArtDirector>
    </div>
  )
}

export default Herobackgroundsection;