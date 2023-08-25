import React from 'react';

import './App.css';

import Headline from './components/headline';
import Navbar from './components/navbar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
//import About from './pages/about';
import Demo from './pages/demo';
import Examples from './pages/examples';
import References from './pages/references';

function App() {
    return (
        <div>
            <Headline />
            <Navbar />
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/demo' element={<Demo />} />
                    <Route path='/examples' element={<Examples />} />
                    <Route path='/references' element={<References />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;