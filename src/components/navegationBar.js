import React from 'react';
import { useEffect, useState } from 'react';
//graphql
import { graphql, useStaticQuery, Link } from 'gatsby';
//components
import { Link as ScrollOnPage }  from 'react-scroll';

const navBarHeight = ((80) * -1); //must be set by developer according to value set on css styles.

const Navegation = () => {

    const data = useStaticQuery(
        graphql`
          query {
            menu: allDatoCmsMenu(sort: {order: ASC, fields: meta___createdAt}) {
                edges {
                    node {
                        id
                        linkScrollTo
                        menuItem
                        urlOutPage
                        onPage
                    }
                }
            }
            logoSVG: file(relativePath: {eq: "logo-black.svg"}) {
                publicURL
                extension
                id
            }
          }
        `
    )

    const [scrolled, setScrolled] = useState(false);
    const [mobile, setMobile] = useState(false);
    const menu = data.menu;
    
    //check on first load to stablish menu as mobile or not
    useEffect(() => {
        (window.innerWidth <= 768) ? setMobile(true) : setMobile(false);
    },[setMobile]);

    useEffect(() => {
        //to avoid the navBar as fixed to move per default
        // window.addEventListener('touchcancel', function(e) { e.preventDefault(); }, false);

        function checkWidth(){
            (window.innerWidth <= 768) ? setMobile(true) : setMobile(false);
        }
        function scrollingDown(){
          (window.scrollY >= 300) ? setScrolled(true) : setScrolled(false);
        }
        window.addEventListener('scroll', scrollingDown);
        window.addEventListener('resize',checkWidth);
    
        return () => {
          window.removeEventListener('scroll',scrollingDown);
          window.removeEventListener('scroll',checkWidth);
          //to avoid the navBar as fixed to move per default
        //   window.removeEventListener('touchcancel', function(e) { e.preventDefault(); }, false);
        }
      },[]);

    return (
        <nav className={`${scrolled ? 'showNavBar' : 'null'} ${mobile ? 'mobileShrink': null}`} id="fixed">
            {
                mobile &&
                <div className="menuCont">>></div>
            }
            <ul className={"ulHorizontal"}>
            {
                menu.edges.map(({ node: item }) => {
                return (
                    <li key={item.id} className={`liItem readingText cursorPointer fontSubtitle navLink`}>
                    {
                        item.onPage ?
                            <ScrollOnPage 
                                to={item.linkScrollTo} 
                                spy={true} 
                                smooth={true} 
                                offset={!mobile ? navBarHeight : 0} 
                                duration={500}
                            >
                            {item.menuItem} 
                            </ScrollOnPage>
                        :
                            <a className="extLink fontSubtitle navLink" href={item.urlOutPage}>{item.menuItem}</a>
                    }
                    </li>
                )
                })
            }
            </ul>
            {
                <div className="logoNavBarContainer">
                    <Link to="/">
                        <img src={data.logoSVG.publicURL} className="imgLogoSVGNavBar" alt="Our solution is the Best" />
                    </Link>
                </div>
            }
        </nav>
    )
}

export default Navegation;