import React from 'react';
//graphql
import { graphql, useStaticQuery, Link } from 'gatsby';
// import Img from 'gatsby-image';

const Footer = () => {

    const data = useStaticQuery(
        graphql`
          query {
            siteLocalData: site {
                siteMetadata {
                    urlAuthor
                    author
                }
            }
            siteConfig: datoCmsSiteConfig {
                companyName
                copyright
                id
                logoMenu {
                    fluid {
                        ...GatsbyDatoCmsFluid
                    }
                }
            }
            footerMenu: allDatoCmsFooterMenu(sort: {fields: meta___createdAt}) {
                edges {
                    node {
                        id
                        menuTitle
                        subMenuItem {
                            id
                            subTitle
                            url
                        }
                    }
                }
            }
            logoSVGColor: file(relativePath: {eq: "logoColor.svg"}) {
                publicURL
                extension
                id
            }
            logoSVGCWhite: file(relativePath: {eq: "logoWhite.svg"}) {
                publicURL
                extension
                id
            }
          }
        `
    )

    const footerMenu = data.footerMenu.edges;
    const siteLocal = data.siteLocalData;
    const site = data.siteConfig;
    const logoSource = data.logoSVGColor.publicURL;

    return (
        <footer>
            <div className="footerRow logoMenuFooter">
                <div className="logoFooterImgCont">
                    {/* <Img fluid={site.logoMenu.fluid} className="logoImgFooter" /> */}
                    <Link to="/">
                        <img src={logoSource} className="imgLogoSVGFooter" alt="Our solution is the Best" />
                    </Link>
                </div>
                <ul className="ulHorizontal noJustAlign mediaAdJustWid">
                    {
                    footerMenu.map(({node: menu}) => {
                        // console.log(menu);
                        return (
                        <li key={menu.id} className="liItemFree paddingXtraLi">
                            {
                                <div className="footerSubMenuCont">
                                    <ul className="ulVertical">
                                        <li key={`${menu.id}-xx`} className="liItemFree readingText fontSubtitle">{menu.menuTitle}</li>
                                        {
                                        menu.subMenuItem.map(subMenu => {
                                            return (
                                            <li key={subMenu.id} className="liItemFree readingText fontSubtitle">
                                                <a href={subMenu.url}>{subMenu.subTitle}</a>
                                            </li>
                                            )
                                        })
                                        }
                                    </ul>
                                </div>
                            }
                        </li>
                        )
                    })
                    }
                </ul>
            </div>
            <div className="footerRow centeredDiv">
                <ul className="ulHorizontal">
                    <li key={`${site.id}-1`} className="liItem smallText fontSubtitle">{site.companyName}</li>
                    <li key={`${site.id}-2`} className="liItem smallText fontSubtitle">{site.copyright}</li>
                    <li key={`${site.id}-3`} className="liItem smallText fontSubtitle">
                        <a href={siteLocal.siteMetadata.urlAuthor}>Made with love by {siteLocal.siteMetadata.author}</a>
                    </li>
                </ul>
            </div>
        </footer> 
    )
}

export default Footer;