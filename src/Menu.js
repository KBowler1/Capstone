import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { CgMenuRound } from "react-icons/cg";
import './navstyle.css'

function NavBar() {
    const [nav, setNav]= useState(false)
    const actionNav =()=> setNav(!nav)
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
            <div className="nav-icons" onClick={actionNav}>
                <CgMenuRound className='icon' />
            </div>
            <div className= {nav ? 'mobmenu active' : 'mobmenu'}>
            <ul className="nav-mob">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/play">Play Game</Link></li>
                <li><Link to="/scores">Scores</Link></li>
                <li><Link to="/about">About Us</Link></li>
            </ul>
            </div>
        </div>
    )
}
export default NavBar;