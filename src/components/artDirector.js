//the main porpouse if this component is:
//allow set and handle upcomming img, in different sizes from datoCMS/graphql
//to show them and manipulate them by using plain css & javascript, combined with reactjs
import React, { useEffect } from 'react'

/**
 * In this functional component a fullscreen <ArtDirected /> may be created
 * with art-directed images. The component will load the bg image when the user sets the resolution by changing the width.
 * @param artDirectorData   Array comming fromdatoCMS, using the already structure declared.
 * @param source    String     Representing the class pre-fix added to the classname component itself.
 * @return {*}
 * 
 * Made by: Saturno Mangieri Developer - [Saturnoman.com](https://www.saturnoman.com)
 */

const ArtDirector = ({ children, artDirectorData, source }) => {
    function checkWidth(){
        const actualW = window.innerWidth;
        artDirectorData.map(function(item){
            // console.log(typeof item);
            // console.log(item);
            if(actualW <= item.breakpoint){
                switch (source) {
                    case "videoBg":
                        // console.log(`Video Src: ${item.heroBackground.url}`);
                        document.documentElement.style.setProperty('--bgVideoImageSrc',`url('${item.heroBackground.url}')`);
                        document.documentElement.style.setProperty('--bgVideoImagePosition', `${item.backgroundPosition}`);
                        if (item.fixed != null ){
                            document.documentElement.style.setProperty('--bgVideoImageAttachment', `${item.fixed ? 'fixed': 'scroll'}`);
                        };
                        // console.log(`Selected Res: ${item.breakpointName}, actual W:${actualW}`);
                        break;
                    case "heroBg":
                        // console.log(`Video Src: ${item.heroBackground.url}`);
                        document.documentElement.style.setProperty('--bgImageSrc',`url('${item.heroBackground.url}')`);
                        document.documentElement.style.setProperty('--bgImagePosition', `${item.backgroundPosition}`);
                        if (item.fixed != null ){
                            document.documentElement.style.setProperty('--bgImageAttachment', `${item.fixed ? 'fixed': 'scroll'}`);
                        };
                        // console.log(`Selected Res: ${item.breakpointName}, actual W:${actualW}`);
                        break;
                    case "buyBg":
                        // console.log(`Video Src: ${item.heroBackground.url}`);
                        document.documentElement.style.setProperty('--bgBuyImageSrc',`url('${item.heroBackground.url}')`);
                        document.documentElement.style.setProperty('--bgBuyImagePosition', `${item.backgroundPosition}`);
                        if (item.fixed != null ){
                            document.documentElement.style.setProperty('--bgBuyImageAttachment', `${item.fixed ? 'fixed': 'scroll'}`);
                        }
                            // console.log(`Selected Res: ${item.breakpointName}, actual W:${actualW}`);
                        break;
                    default:
                        break;
                }
                // document.documentElement.style.setProperty('--bgImageSrc',`url('${item.heroBackground.url}')`);
                // document.documentElement.style.setProperty('--bgImagePosition', `${item.backgroundPosition}`);
                // console.log(`Selected Res: ${item.breakpointName}, actual W:${actualW}`);
            }
            return 0;
        });
    }
    //on first load & then attach event on resize
    useEffect(() => {
        checkWidth();
        // console.log('Executing first check on load');
    });
    useEffect(() => {
        // checkWidth();
        window.addEventListener('resize',checkWidth);

        return () => {
            window.removeEventListener('resize',checkWidth);
        }
    });

    return (
        <div className="bgWrapper">
            {/* <div className="imgBgContainer" id="imgBgDiv"> */}
            <div className={`${source}Container`} id={`${source}Div`} >
                <div className={`${source}ChildContainer`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ArtDirector;