import React, { useState, useEffect } from 'react'

import Core from '../components/cira-core/Core';
 
const Demo = () => {
    const [responsivecore, setResponsivecore] = useState(false)

    // heartbeat
    useEffect(() => {
        fetch('http://localhost:8000/api/health', {
            method: 'get'
        }).then(res => res.json())
            .then(heartbeat => {
                if (Object.hasOwn(heartbeat, "status")) {
                    setResponsivecore(true);
                }
            })
            .catch(function (error) {
                console.error(error)
            });
    }, [])

    return (
        <div>
            <h2>Causality Extraction: Demo</h2>
            <p>On this page you can explore the automatic, step-wise extraction of cause-effect relations from natural language sentences through our accessible online demo. The code behind this demonstration is open source and publicly available on <a href='https://github.com/JulianFrattini/cira' target="_blank" rel="noreferrer">GitHub</a>. You can also look at some <a href='/examples'>examples</a> for inspiration.</p>
            {
                responsivecore ?
                <Core></Core> :
                <p>The CiRA Core is currently not available. You can find a self-hostable version of the CiRA UI <a href='https://github.com/JulianFrattini/cira-ui' target="_blank" rel="noreferrer">on GitHub</a> or explore some <a href='/examples'>static examples</a>.</p>
            }
            
        </div>
    );
};
 
export default Demo;