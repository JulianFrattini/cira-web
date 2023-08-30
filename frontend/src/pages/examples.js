import React, { useState, useEffect } from "react";

import sentences from './../data/sentences.json'

import LabelVisualizer from "../packages/labelvisualization/LabelVisualizer";
import CEGVisualizer from "../packages/graphvisualization/CEGVisualizer";

const Examples = () => {
    const [switching, setSwitching] = useState(false);
    const [selected, setSelected] = useState(sentences[0].id);

    const [sentence, setSentence] = useState(sentences[0].text);
    const [labels, setLabels] = useState(sentences[0].labels);
    const [ceg, setCeg] = useState(sentences[0].graph);
    const [cegdesc, setCegdesc] = useState("");

    useEffect(() => {
        let index = sentences.indexOf(sentences.find((sentence) => sentence.id === selected));
        
        setSentence(sentences[index].text);
        setLabels(sentences[index].labels);
        
        setCeg(sentences[index].graph);
        if('desc' in sentences[index].graph) {
            setCegdesc(sentences[index].graph.desc);
        } else {
            setCegdesc("");
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
            {cegdesc ? 
                <p>{cegdesc}</p> : 
                <p>no desc</p>}
            {(ceg != null) ?
                <CEGVisualizer ceg={ceg}></CEGVisualizer> :
                <p>Cause-Effect Graph loading ... </p>
        }
        </div>
    );
};

export default Examples;