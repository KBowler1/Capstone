import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { CgMenuRound } from "react-icons/cg";
import './navstyle.css'

function NavBar() {
    const [nav, setNav]= useState(false)
    const handleNav =()=> setNav(!nav)

    const closeMenu = () => {
        setNav(false);
    };
    return (
        <div className='navbar'>
            
            <div className="logo">
               <h2>KAN Jeopardy</h2>
            </div>
            <ul className="nav-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/play">Play Game</Link></li>
                <li><Link to="/scores">Scores</Link></li>
                <li><Link to="/about">About Us</Link></li>
            </ul>
            <div className="nav-icons" onClick={handleNav}>
                <CgMenuRound className='icon' />
            </div>
            <div className= {nav ? 'mobmenu active' : 'mobmenu'}>
            <ul className="nav-mob">
                <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/play" onClick={closeMenu}>Play Game</Link></li>
                <li><Link to="/scores" onClick={closeMenu}>Scores</Link></li>
                <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
            </ul>
            </div>
        </div>
    )
}
export default NavBar;