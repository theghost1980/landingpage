import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
//components
import ArtDirector from './artDirector';
import Btnlanding from './btnLanding';

const Videobgsection = () => {
  let _artVideoData = [];
  const data = useStaticQuery(
    graphql`
      query {
        bgVideoData: allDatoCmsVideoFeature(filter: {featuredVideo: {eq: true}}) {
            totalCount
            edges {
                node {
                    featuredVideo
                    id
                    subTitle
                    title
                    contentNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    videoUrl {
                        provider
                        providerUid
                    }
                    resolutionsBackground {
                        fixed
                        backgroundPosition
                        breakpoint
                        breakpointName
                        id
                        heroBackground {
                            fluid {
                                src
                            }
                            url
                        }
                    }
                }
            }
        }
      }
    `
  )
//   data.bgVideoData.edges.map(item => console.log(item));
  function dataImgBg(){
    //check if an image feature has been set on Hero section, otherwise error presented by console.
    try {
      if(data.bgVideoData.totalCount === 0 || data.bgVideoData.totalCount > 1){ throw new Error('Featured not Assinged or assigned more than 1') };
    //   let ArtDirectorData = data.bgVideoData.edges.find(({ node: item }) => item.featured === true)
    //       .node.resolutionsBackground;
      _artVideoData = data.bgVideoData.edges.find(({ node: item }) => item.featuredVideo === true).node;
    //   console.log("_artVideoData");
    //   console.log(_artVideoData.resolutionsBackground);
      return _artVideoData.resolutionsBackground;
    } catch (error) {
      alert('Possible error con template configuration \nPlease take a look at the console ->');
      console.log(error);
      console.log("===Configuration Error on template===");
      console.log("Possible Error #1: It looks like you haven't set a featured Video on DatoCMS > video feature > featured");
      console.log("Possible Error #2: It may be more than 1 video background img selected as featured, the system will bring the first occurence.");
      console.log("===End Error on template===");
    }
  }

  function urlResolver(provider,providerUid){
      if(provider === "youtube"){
        return `https://www.youtube.com/embed/${providerUid}`
      }else if(provider === "vimeo"){
        return `https://player.vimeo.com/video/${providerUid}`
      }
  }

  return (
    <div className="videoBgSectionCont" id="video">
      <ArtDirector
        artDirectorData={dataImgBg()}
        source={"videoBg"}
      >
        <div className="videoContentWrapper">
            <div className="videoCont">
                <iframe 
                    className="iframeVideo"
                    src={urlResolver(_artVideoData.videoUrl.provider,_artVideoData.videoUrl.providerUid)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen={true}
                    frameBorder="0" 
                    title="What we offer video"
                />
            </div>
            <div className="contentVideo">
                <h1 className="contrastTitle heading">{_artVideoData.title}</h1>
                <h2 className="contrastTitle subHeading">{_artVideoData.subTitle}</h2>
                <div className="contrastText readingText paragraphFont"
                    dangerouslySetInnerHTML={{
                        __html: _artVideoData.contentNode.childMarkdownRemark.html
                    }}
                />
                <div className="btn250x60">
                  <Btnlanding typeBtn="filled" highContrast={"highContrast"}>I'm Sold</Btnlanding>
                </div>
            </div>
        </div>
    </ArtDirector>
    </div>
  )
}

export default Videobgsection;