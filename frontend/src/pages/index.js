import React from 'react';

import '../stylesheets/containerlist.css'

const Home = () => {
    return (
        <div>
            <p>Welcome to the homepage of the 'Causality in Requirement Artifacts' (CiRA) initiative. This project is conducted by researchers of the University of Cologne, Blekinge Institute of Technology, and Qualicen GmbH. For further information about the participating institutions please click on the icons in the header of the website. The project was started in 2019 and focuses on the linguistic phenomenon of causality in various artifacts used in the software development lifecycle (e.g. requirement artifacts).</p>

            <h2>Philosophy</h2>
            <p>System behavior is usually described by causal relations, e.g. 'A confirmation message shall be shown if the system has successfully processed the data.' Hence, causal relations are often inherently embedded in the textual descriptions of requirements. We argue that extracting this embedded causal knowledge supports not only reasoning about requirements dependencies, but also various automated engineering tasks such as seamless derivation of test cases (for a full description of the use cases see <a href="https://ieeexplore.ieee.org/abstract/document/9218193" target="_blank" rel="noreferrer">our corresponding paper</a>). However, causality extraction from natural language (NL) is still an open research challenge as existing approaches fail to extract causality with reasonable performance. To address this research gap, we initiated the CiRA project.</p>

            <h2>Our Goals</h2>
            <p>Our goal is to develop suitable methods to identify and extract the knowledge contained in causal relations and to make it available to stakeholders in the software development cycle. To this end, we deal with the following research questions:</p>
            <ul>
                <li>In what form and complexity does causality occur in requirement documents?</li>
                <li>How can we automatically distinguish causal from non-causal sentences?</li>
                <li>How can we automatically extract causal relations from sentences written in unrestricted natural language?</li>
            </ul>

            <h2>Tools</h2>
            <p>During the project we implement a number of different tools. To support open science, we publish the code for each tool and invite other researchers and practitioners to apply the tools for their own purposes. For some tools we also provide an online demo. The links to these demos can be found below. The link to the code resp. github repository can be found in our paper overview.</p>

            <div className='container'>
                <div className='element'>
                    <a href='/demo'>
                        <div className='demo highlightable'>
                            <img className='demoicon' src='images/icons/causalc.svg' alt="CiRA Logo"></img>
                            <h3>Automatic Causality Extraction</h3>
                        </div>
                    </a>
                </div>
            </div>


            <h2>Funding</h2>
            <p>We would like to thank the KKS foundation through the S.E.R.T. Research Profile project at Blekinge Institute of Technology for funding this project.</p>
        </div>
    );
};

export default Home;