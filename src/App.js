import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import Home from './Home';
import PlayGame from './PlayGame';
import Scores from './Scores';
import AboutUs from './AboutUs';
import './index.css';

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    
                        <div>
                            <Menu />
                        </div>
                    
                   {/* <button onClick={toggleMenu}>Menu</button>*/}
                </header>
                {/*<Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />*/}

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/play" element={<PlayGame />} />
                    <Route path="/scores" element={<Scores />} />
                    <Route path="/about" element={<AboutUs />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
