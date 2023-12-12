import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Scores.css';
const Scores = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        // Fetch leaderboard data from the server
        axios.get('http://localhost:3001/api/leaderboard')
            .then(response => {
                // Handle the response data and set it to state
                const leaderboardData = response.data;
                setLeaderboard(leaderboardData);
            })
            .catch(error => {
                console.error('Error fetching leaderboard data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Leaderboard</h1>
            <table>
                <thead>
                <tr>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {leaderboard.map((entry, index) => (
                    <tr key={index}>
                        <td>{entry.name}</td>
                        <td>{entry.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Scores;
