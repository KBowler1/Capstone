import { createContext, useContext, useState } from 'react';

// Create a context
const ScoreContext = createContext();

// Create a context provider
export function ScoreProvider({ children }) {
    const [scores, setScores] = useState([]);

    // Function to update scores
    const updateScores = (newScore) => {
        setScores((prevScores) => [...prevScores, newScore]);
    };

    return (
        <ScoreContext.Provider value={{ scores, updateScores }}>
            {children}
        </ScoreContext.Provider>
    );
}

// Custom hook to access the context
export function useScores() {
    return useContext(ScoreContext);
}