import React from "react";

import './navbar.css'

const Navbar = () => {
    return (
        <div class="nav">
            <div class="navmenu">
                <a class="navlink" href="/" activeStyle>
                    Home
                </a>
                <a class="navlink" href="/about" activeStyle>
                    About
                </a>
                <a class="navlink" href="/demo" activeStyle>
                    Demonstration
                </a>
                <a class="navlink" href="/references" activeStyle>
                    References
                </a>
            </div>
        </div>
    );
};

export default Navbar;