import * as React from "react";
//graphql
import { graphql } from 'gatsby';
//components
import Herobackgroundsection from "../components/heroBgSection";
import Navegation from "../components/navegationBar";
import SolutionSection from "../components/solutionSection";
import Footer from "../components/footer";
import Videobgsection from "../components/videoBgSection";
import Trustsection from "../components/trustSection";
import Buybgsection from "../components/buyBgSection";
import { HelmetDatoCms } from "gatsby-source-datocms";
/////////////////////////////
//Important to prevent the scrolling down on fixed elements on viewport - mobiles
//meta viewport issue just on Google Chrome
import {Helmet} from 'react-helmet'
//end Important
/////////////////////////////

//styles
import '../styles/index.css';

// markup
const IndexPage = (props) => {

  return (
    <main id="mainWrapper">
      <Helmet htmlAttributes={{ lang: `en`}}>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1" />
      </Helmet>
      <HelmetDatoCms seo={props.data.siteConfig.seoMetaTags}>
        <link rel="canonical" href={`${props.data.siteLocalData.siteMetadata.websiteUrl}`} />
      </HelmetDatoCms>
      <Navegation />
      <Herobackgroundsection />
      <SolutionSection />
      <Videobgsection />
      <Trustsection />
      <Buybgsection />
      <Footer />
    </main>
  )
}

export default IndexPage;


export const data = graphql`
  query{
    siteLocalData: site {
      siteMetadata {
        urlAuthor
        author
        websiteUrl
      }
    }
    siteConfig: datoCmsSiteConfig {
      companyName
      copyright
      id
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;