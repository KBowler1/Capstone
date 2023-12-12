import React from 'react';
import { Link } from 'react-router-dom';
import './welcome.css';
import './index.css';



const Home = () => {
    return (
        <div class="content">
            <h1 class="text-shadows">   Welcome to Jeopardy!</h1>

            {/*<p>Welcome to our online Jeopardy game! Ready to test your knowledge?</p>
            <Link to="/play">Start Game</Link>
            
            {/* You can add more links or information here 
            <div>
                <Link to="/scores">View Scores</Link>
            </div>
            <div>
                <Link to="/about">About Us</Link>
    </div>*/}
        </div>
    );
};

export default Home;