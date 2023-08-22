import React from "react";

import './navbar.css'

const Navbar = () => {
    return (
        <div className="nav">
            <div className="navmenu">
                <a className="navlink" href="/" activestyle="true">
                    Home
                </a>
                <a className="navlink" href="/demo" activestyle="true">
                    Demonstration
                </a>
                <a className="navlink" href="/references" activestyle="true">
                    References
                </a>
            </div>
        </div>
    );
};

export default Navbar;