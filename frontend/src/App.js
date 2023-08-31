import React from 'react';

import './App.css';

import Headline from './components/headline/index';
//import Navbar from './components/navbar/index';
import './stylesheets/navbar.css'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/index';
//import About from './pages/about';
import Demo from './pages/demo';
import Examples from './pages/examples';
import References from './pages/references';

function App() {
    return (
        <div>
            <Headline />
            <div className="nav">
                <div className="navmenu">
                    <a className="navlink" href="/" activestyle="true">
                        Home
                    </a>
                    <a className="navlink" href="/demo" activestyle="true">
                        Demonstration
                    </a>
                    <a className="navlink" href="/examples" activestyle="true">
                        Examples
                    </a>
                    <a className="navlink" href="/references" activestyle="true">
                        References
                    </a>
                </div>
            </div>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/demo' element={<Demo />} />
                    <Route path='/examples' element={<Examples />} />
                    <Route path='/references' element={<References />} />

                    <Route path='/bert' element={<Navigate replace to='/demo' />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;