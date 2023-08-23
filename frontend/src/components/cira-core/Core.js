import React, { useState, useEffect } from 'react'

import '../../stylesheets/form.css'

import LabelVisualizer from '../../packages/labelvisualization/LabelVisualizer'
import CEGVisualizer from '../../packages/graphvisualization/CEGVisualizer'
import SuiteVisualizer from '../../packages/suitevisualization/SuiteVisualizer'


function Core() {
    const [serverResponding, setServerResponding] = useState(false)

    const [fieldSentence, setFieldSentence] = useState("When the red button is pushed or the power fails the system shuts down.")

    const [analyzing, setAnalyzing] = useState(false)
    const [classifying, setClassifying] = useState(false)

    const [sentence, setSentence] = useState("")

    const [classification, setClassification] = useState(null)
    const [confidence, setConfidence] = useState(0.0)

    const [labels, setLabels] = useState([])
    const [ceg, setCeg] = useState(null)
    const [suite, setSuite] = useState(null)

    /*useEffect(() => {
        if (sentence) {
            fetch('http://localhost:8000/api/label', {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "sentence": sentence })
            }).then(res => res.json())
                .then(jsonlabels => setLabels(jsonlabels.labels))
                .then(() => {
                    return fetch('http://localhost:8000/api/graph', {
                        method: 'PUT',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            "sentence": sentence,
                            "labels": labels.labels
                        })
                    });
                })
                .then(res => res.json())
                .then(graph => {
                    setCeg(graph.graph);

                    return fetch('http://localhost:8000/api/testsuite', {
                        method: 'PUT',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            "sentence": sentence,
                            "graph": graph.graph
                        })
                    });
                })
                .then(res => res.json())
                .then(testsuite => setSuite(testsuite.suite))
                .then(() => { setAnalyzing(false) })
                .catch(function (error) {
                    console.error(error)
                });
        }
    }, [sentence]);*/

    // heartbeat
    useEffect(() => {
        fetch('http://localhost:8000/api/health', {
            method: 'get'
        }).then(res => res.json())
            .then(heartbeat => {
                if (Object.hasOwn(heartbeat, "status")) {
                    setServerResponding(true);
                }
            })
            .catch(function (error) {
                console.error(error)
            });
    }, [])

    const analyze = (e) => {
        e.preventDefault();

        setAnalyzing(true)
        setLabels([])
        setCeg({})
        setSuite(null)
        setSentence(fieldSentence)
    }

    const classify = (e) => {
        e.preventDefault();
        setClassifying(true);
        setClassification(null);
        setSentence(fieldSentence);
    }

    useEffect(() => {
        if(!sentence) {
            return;
        }

        fetch('http://localhost:8000/api/classify', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "sentence": sentence })
        }).then(res => res.json())
            .then(classification => {
                setClassification(classification.causal);
                setConfidence(classification.confidence);
                setClassifying(false)
            })
    }, [classifying])

    return (
        <div className="core">
            <h2>Step 1: Classification</h2>
            <p>Enter a causal requirements and click 'analyze' to let CiRA automatically determine, whether the requirement is causal and hence eligible for further processing. You can find more details on the classifier in <a href='https://arxiv.org/abs/2101.10766' target="_blank" rel="noreferrer">our corresponding paper</a>.</p>
            <form className='submit-form' onSubmit={(e) => classify(e)}>
                <input type='text' id='sentence' onChange={e => setFieldSentence(e.target.value)} value={fieldSentence} autoFocus></input>
                <input type="submit" value='Classify' disabled={!serverResponding}></input>
            </form>
            {!classifying && classification!=null &&
                <p>CiRA has determined that sentence is {classification ? 'causal' : 'non-causal'} with a confidence of {(confidence*100).toFixed(2)}%.</p>
            }

            {!analyzing && labels.length > 0 &&
                <div>
                    <h2>Step 2: Labeling</h2>
                    <LabelVisualizer text={sentence} labels={labels}></LabelVisualizer>
                </div>
            }
            {!analyzing && ceg != null &&
                <div>
                    <h2>Cause-Effect-Graph</h2>
                    <CEGVisualizer ceg={ceg}></CEGVisualizer>
                </div>
            }
            {!analyzing && suite != null && 
                <div>
                    <h2>Test Suite</h2>
                    <SuiteVisualizer suite={suite}></SuiteVisualizer>
                </div>
            }
        </div>
    );
}

export default Core;