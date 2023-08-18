import React from "react";

import './headline.css'
 
const Headline = () => {
    return (
        <div className="headline">
            <h1 className="largescreen">Causality in Requirements Artifacts (CiRA)</h1>
            <h1 className="smallscreen">CiRA</h1>
            <a href="https://cs.uni-koeln.de/" target="_blank" rel="noreferrer">
                <img className="logo" src="images/logos/uni_cologne.jpg" alt="University of Cologne Logo"/>
            </a>
            <a href="https://www.bth.se/eng/about-bth/organisation/faculty-of-computing/softwareengineering/" target="_blank" rel="noreferrer">
                <img className="logo" src="images/logos/bth.png" alt="BTH Logo"/>
            </a>
            <a href="https://www.qualicen.de/" target="_blank" rel="noreferrer">
                <img className="logo" src="images/logos/qualicen.png" alt="Qualicen Logo"/>
            </a>
        </div>
    );
};
 
export default Headline;