import React, {useState, useEffect} from "react";

import sentences from './../data/sentences.json'

import LabelVisualizer from "../packages/labelvisualization/LabelVisualizer";

const Examples = () => {
    const [switching, setSwitching] = useState(false);
    const [selected, setSelected] = useState(sentences[0].id);

    const [sentence, setSentence] = useState(sentences[0].text);
    const [labels, setLabels] = useState(sentences[0].labels);

    useEffect(() => {
        let index = parseInt(selected)-1;
        setSentence(sentences[index].text);
        setLabels(sentences[index].labels);
        setSwitching(false);
    }, [selected])

    return (
        <div>
            <h2>Test Case Generation: Examples</h2>
            <p>This page illustrates and describes some examples for the <a href='/demo'>causality extraction demo</a> for automatic test case generation.</p>

            <div>
                <select value={selected} onChange={e => {setSelected(e.target.value); setSwitching(true);}}>
                    {
                        sentences.map(sentence =>
                            <option key={sentence.id} value={sentence.id}>{sentence.title} {}</option>
                        )
                    }
                </select>
            </div>

            <p><b>Example sentence: </b>{sentence}</p>
            
            <h3>Labels</h3>
            {(!switching && sentence != null && labels.length > 0) ? 
                <LabelVisualizer text={sentence} labels={labels}></LabelVisualizer> :
                <p>Labels loading ... </p>
            }
        </div>
    );
};

export default Examples;