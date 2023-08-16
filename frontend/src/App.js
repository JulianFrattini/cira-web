import React from 'react';

import './App.css';

import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages';
import About from './pages/about';
import Demo from './pages/demo';
import References from './pages/references';
 
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' exact element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/demo' element={<Demo />} />
                <Route path='/references' element={<References />} />
            </Routes>
        </Router>
    );
}
 
export default App;