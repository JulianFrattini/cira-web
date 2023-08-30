import React, { useState, useEffect } from "react";

import sentences from './../data/sentences2.json'

import LabelVisualizer from "../packages/labelvisualization/LabelVisualizer";
import CEGVisualizer from "../packages/graphvisualization/CEGVisualizer";
import SuiteVisualizer from "../packages/suitevisualization/SuiteVisualizer";

const Examples = () => {
    const [switching, setSwitching] = useState(false);
    const [selected, setSelected] = useState(sentences[0].id);

    const [sentence, setSentence] = useState(sentences[0].text);
    const [labels, setLabels] = useState(sentences[0].labels);

    const [ceg, setCeg] = useState(sentences[0].graph);
    const [cegdesc, setCegdesc] = useState("");

    const [suite, setSuite] = useState(sentence[0].testsuite);
    const [suitedesc, setSuitedesc] = useState("");

    useEffect(() => {
        let index = sentences.indexOf(sentences.find((sentence) => sentence.id === selected));
        
        setSentence(sentences[index].text);
        setLabels(sentences[index].labels);
        
        setCeg(sentences[index].graph);
        if('desc' in sentences[index].graph) {
            setCegdesc(sentences[index].graph.desc);
        } else {
            setCegdesc("CiRA constructs the following cause-effect graph from the labeled sentence:");
        }

        setSuite(sentences[index].testsuite);
        if('desc' in sentences[index].testsuite && sentences[index].testsuite.desc) {
            setSuitedesc(sentences[index].testsuite.desc);
        } else {
            setSuitedesc("Based on the cause-effect graph, the following, minimal set of test cases ensures full coverage of the initial requirement:");
        }

        setSwitching(false);
    }, [selected])

    return (
        <div>
            <h2>Test Case Generation: Examples</h2>
            <p>This page illustrates and describes some examples for the <a href='/demo'>causality extraction demo</a> for automatic test case generation.</p>

            <div>
                <select value={selected} onChange={e => {
                    setSelected(e.target.value);
                    setSwitching(true);
                }}>
                    {
                        sentences.map(sentence =>
                            <option key={sentence.id} value={sentence.id}>{sentence.title} { }</option>
                        )
                    }
                </select>
            </div>

            <p><b>Example sentence: </b>{sentence}</p>

            <h3>Labels</h3>
            <p>CiRA labels the sentence as follows:</p>
            {(!switching && sentence != null && labels.length > 0) ?
                <LabelVisualizer text={sentence} labels={labels}></LabelVisualizer> :
                <p>Labels loading ... </p>
            }

            <h3>Cause-Effect-Graph</h3>
            <p>{cegdesc}</p>
            {(ceg != null) ?
                <CEGVisualizer ceg={ceg}></CEGVisualizer> :
                <p>Cause-Effect Graph loading ... </p>
            }

            <h3>Acceptance Tests</h3>
            <p>{suitedesc}</p>
            {(suite != null) ? 
                <SuiteVisualizer suite={suite}></SuiteVisualizer> :
                <p>Test suite loading ...</p>}
        </div>
    );
};

export default Examples;