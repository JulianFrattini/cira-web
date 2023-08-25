import React, { useState, useEffect } from 'react'

import '../../stylesheets/form.css'

import LabelVisualizer from '../../packages/labelvisualization/LabelVisualizer'
import CEGVisualizer from '../../packages/graphvisualization/CEGVisualizer'
import SuiteVisualizer from '../../packages/suitevisualization/SuiteVisualizer'


function Core() {
    const [fieldSentence, setFieldSentence] = useState("When the red button is pushed or the power fails the system shuts down.")
    const [sentence, setSentence] = useState("")

    // variables representing whether the different parts of the pipeline are currently working
    const [classifying, setClassifying] = useState(false)
    const [labeling, setLabeling] = useState(false)
    const [graphing, setGraphing] = useState(false)
    const [testing, setTesting] = useState(false)

    // variables storing the data from the different steps of the pipeline
    const [classification, setClassification] = useState(null)
    const [confidence, setConfidence] = useState(0.0)
    const [labels, setLabels] = useState([])
    const [ceg, setCeg] = useState(null)
    const [suite, setSuite] = useState(null)

    const classify = (e) => {
        e.preventDefault();
        setClassifying(true);
        setClassification(null);
        setLabels([])
        setCeg(null)
        setSuite(null)
        setSentence(fieldSentence);
    }

    const label = (e) => {
        e.preventDefault();
        setLabels([])
        setCeg(null)
        setSuite(null);
        setLabeling(true);
    }

    const graph = (e) => {
        e.preventDefault();
        setCeg(null)
        setSuite(null);
        setGraphing(true);
    }

    const test = (e) => {
        e.preventDefault();
        setSuite(null);
        setTesting(true);
    }

    useEffect(() => {
        if (!sentence || !classifying) {
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
    }, [classifying, sentence])

    useEffect(() => {
        if (!sentence || !labeling) {
            return;
        }

        fetch('http://localhost:8000/api/label', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "sentence": sentence })
        }).then(res => res.json())
            .then(jsonlabels => {
                setLabels(jsonlabels.labels);
                setLabeling(false);
            })
    }, [labeling, sentence])

    useEffect(() => {
        if (!sentence || !graphing) {
            return;
        }

        fetch('http://localhost:8000/api/graph', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "sentence": sentence,
                "labels": labels.labels
            })
        }).then(res => res.json())
            .then(graph => {
                setCeg(graph.graph);
                setGraphing(false);
            })
    }, [graphing, sentence, labels.labels])

    useEffect(() => {
        if (!sentence || !testing) {
            return;
        }

        fetch('http://localhost:8000/api/testsuite', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "sentence": sentence,
                "graph": graph.graph
            })
        }).then(res => res.json())
            .then(testsuite => {
                setSuite(testsuite.suite)
                setTesting(false);

            })
    }, [testing, sentence])

    return (
        <div className="core">
            <h2>Step 1: Classification</h2>
            <p>Enter a requirements and click 'analyze' to let CiRA automatically determine whether the requirement is causal and hence eligible for further processing. You can find more details on the classifier in <a href='https://arxiv.org/abs/2101.10766' target="_blank" rel="noreferrer">our corresponding paper</a>.</p>
            <form className='submit-form' onSubmit={(e) => classify(e)}>
                <input type='text' id='sentence' onChange={e => setFieldSentence(e.target.value)} value={fieldSentence} autoFocus></input>
                <input type="submit" value='Classify'></input>
            </form>
            {!classifying && classification != null &&
                <p>CiRA has determined that sentence is <b>{classification ? 'causal' : 'non-causal'}</b> with a confidence of {(confidence * 100).toFixed(2)}%. {classification ? 'Since the sentence is considered causal, it can be processed further by CiRA.' : 'Since the sentence is considered non-causal, it cannot be processed further by CiRA. Try with a different sentence or reformulate your sentence to make the causal relation more explicit (e.g., using a "If ... then ..." structure).'}</p>
            }

            {classification === true && labels.length === 0 &&
                <form className='submit-form' onSubmit={(e) => label(e)}>
                    <input type="submit" value='Label'></input>
                </form>
            }
            {!labeling && labels.length > 0 &&
                <div>
                    <h2>Step 2: Labeling</h2>
                    <p>In the second step, the CiRA multi-class labeler (described in more detail in our <a href='https://arxiv.org/abs/2202.00932' target="_blank" rel="noreferrer">corresponding publication</a>) assigns to each word of the sentence a label representing its role in the causal relationship.</p>
                    <LabelVisualizer text={sentence} labels={labels}></LabelVisualizer>
                </div>
            }

            {labels.length > 0 && ceg == null &&
                <form className='submit-form' onSubmit={(e) => graph(e)}>
                    <input type="submit" value='Create Cause-Effect Graph'></input>
                </form>
            }
            {!graphing && ceg != null &&
                <div>
                    <h2>Step 3: Cause-Effect Graph</h2>
                    <p>In the third step, the CiRA tool converts the labeled sentence into a cause-effect graph, in which nodes represent either events (causes and effects) containing variables and conditions or junctors (conjunctions (AND) or disjunctions (OR)), and edges represent causal relations (edges with a tilde represent a negated relation).</p>
                    <CEGVisualizer ceg={ceg}></CEGVisualizer>
                </div>
            }

            {ceg != null && suite == null &&
                <form className='submit-form' onSubmit={(e) => test(e)}>
                    <input type="submit" value='Create Test Suite'></input>
                </form>
            }
            {!testing && suite != null &&
                <div>
                    <h2>Step 4: Test Suite</h2>
                    <p>Finally, CiRA generates a minimal set of test cases (combinations of input and output values) from the cause-effect graph.</p>
                    <SuiteVisualizer suite={suite}></SuiteVisualizer>
                </div>
            }
        </div>
    );
}

export default Core;