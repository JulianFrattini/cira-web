import React from 'react';

import Core from '../components/cira-core/Core';
 
const Demo = () => {
    return (
        <div>
            <h2>Causality Extraction: Demo</h2>
            <p>On this page you can explore the automatic, step-wise extraction of cause-effect relations from natural language sentences through our accessible online demo. The code behind this demonstration is open source and publicly available on <a href='https://github.com/JulianFrattini/cira' target="_blank" rel="noreferrer">GitHub</a>.</p>
            <Core></Core>
        </div>
    );
};
 
export default Demo;