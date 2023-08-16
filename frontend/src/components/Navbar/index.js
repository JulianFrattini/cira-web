import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/demo" activeStyle>
                        Demonstration
                    </NavLink>
                    <NavLink to="/references" activeStyle>
                        References
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;