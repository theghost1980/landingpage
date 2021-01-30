import React from 'react';

// Notes: If not width specified, it will take 100% which means it will need a Container.

const Btnlanding = (props) => {

    const typeBtn = props.typeBtn || null;
    const margin = props.margin || false;
    const highContrast = props.highContrast || null;

    /**
     * In this functional component a button <Btnlanding /> may be created
     * you may pass the follwing props in order to affect the button's behaviuor and styles
     * @param typeBtn   String. "filled" for a filled button style  
     * @param margin    Boolean.  true, to add margin to this button.
     * @param highContrast String. "highContrast" to set the font color of this button as high contrast. Defined in CSS stylying sheet.
     * @return {*}
     * 
     * Made by: Saturno Mangieri Developer - [Saturnoman.com](https://www.saturnoman.com)
     */

    return (
        <div className={`btn-Primary shadowBtn readingText ${typeBtn} ${margin ? 'marginBtn' : null} ${highContrast}`}>
            {props.children}
        </div>
    )
}

export default Btnlanding;