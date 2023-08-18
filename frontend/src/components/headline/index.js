import React from "react";

import './headline.css'
 
const Headline = () => {
    return (
        <div class="headline">
            <h1 class="largescreen">Causality in Requirements Artifacts (CiRA)</h1>
            <h1 class="smallscreen">CiRA</h1>
            <a href="https://cs.uni-koeln.de/" target="_blank" rel="noreferrer">
                <img class="logo" src="images/logos/uni_cologne.jpg" alt="University of Cologne Logo"/>
            </a>
            <a href="https://www.bth.se/eng/about-bth/organisation/faculty-of-computing/softwareengineering/" target="_blank" rel="noreferrer">
                <img class="logo" src="images/logos/bth.png" alt="BTH Logo"/>
            </a>
            <a href="https://www.qualicen.de/" target="_blank" rel="noreferrer">
                <img class="logo" src="images/logos/qualicen.png" alt="Qualicen Logo"/>
            </a>
        </div>
    );
};
 
export default Headline;