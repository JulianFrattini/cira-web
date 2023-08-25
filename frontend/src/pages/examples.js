import React, {useState, useEffect} from "react";

import sentences from './../data/sentences.json'

const Examples = () => {

    const [selected, setSelected] = useState(sentences[0].id)

    useEffect(() => {
        console.log(selected);
    }, [selected])

    return (
        <div>
            <h2>Test Case Generation: Examples</h2>
            <p>This page illustrates and describes some examples for the <a href='/demo'>causality extraction demo</a> for automatic test case generation.</p>

            <div>
                <select value={selected} onChange={e => setSelected(e.target.value)}>
                    {
                        sentences.map(sentence =>
                            <option key={sentence.id} value={sentence.id}>{sentence.title} {}</option>
                        )
                    }
                </select>
            </div>
        </div>
    );
};

export default Examples;