import React from "react";

import './../stylesheets/tables.css'
import publications from './../data/publications.json'

const References = () => {
    return (
        <div>
            <h2>Content and Links</h2>
            <p>Browse through the list of published papers associated with the CiRA project. For each publication we link the corresponding paper (<span><i className="fa fa-file" title="Publication"></i></span>), published code (<span><i className="fab fa-github" title="Source Code"></i></span>), data sets (<span><i className="fa fa-database" title="Data Set"></i></span>), and accessible demos (<span><i className="fa fa-gamepad" title="Demonstration"></i></span>).</p>

            <table className="t_span">
                <thead>
                    <tr>
                        <td className="tcol_icon">#</td>
                        <td>Paper</td>
                        <td className="tcol_icon"><i className="fa fa-file" title="Article" /></td>
                        <td className="tcol_icon"><i className="fab fa-github" title="Source Code" /></td>
                        <td className="tcol_icon"><i className="fa fa-database" title="Data Set" /></td>
                        <td className="tcol_icon"><i className="fa fa-gamepad" title="Demonstration" /></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        publications.map(pub =>
                            <tr key={pub.index}>
                                <td>{pub.index}</td>
                                <td>{pub.label}</td>
                                <td>{pub.link ? <a href={pub.link} target="_blank" rel="noreferrer"><i className="fa fa-file" /></a> : ""}</td>
                                <td>{pub.repo ? <a href={pub.repo} target="_blank" rel="noreferrer"><i className="fab fa-github" /></a> : ""}</td>
                                <td>{pub.data ? <a href={pub.data} target="_blank" rel="noreferrer"><i className="fa fa-database" /></a> : ""}</td>
                                <td>{pub.demo ? <a href={pub.demo} target="_blank" rel="noreferrer"><i className="fa fa-gamepad" /></a> : ""}</td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default References;