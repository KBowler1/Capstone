import React, { useState, useEffect } from 'react';
import "./PlayGame.css";
import { useScores } from './ScoreContext';
import axios from 'axios';

const wordCategories = {
    Animals: ["Dog", "Cat", "Elephant", "Lion", "Tiger", "Giraffe", "Zebra", "Kangaroo", "Dolphin", "Penguin",
        "Polar bear", "Gorilla", "Chimpanzee", "Cheetah", "Hippopotamus", "Crocodile", "Eagle", "Owl", "Fox",
        "Bear", "Rhinoceros", "Koala", "Octopus", "Platypus", "Dragon", "Panda", "Parrot", "Orca", "Raccoon",
        "Bison", "Shark", "Turtle", "Sloth", "Gazelle", "Peacock", "Flamingo", "Whale", "Beetle", "Jellyfish",
        "Seahorse", "Tarantula", "Ostrich", "Walrus", "Cobra", "Spider", "Hawk", "Armadillo", "Chipmunk", "Porcupine"],
    Countries: ["United States", "Canada", "Mexico", "Brazil", "Argentina", "United Kingdom", "France", "Germany",
        "Italy", "Spain", "Portugal", "Greece", "Russia", "China", "Japan", "South Korea", "India", "Australia",
        "New Zealand", "South Africa", "Egypt", "Nigeria", "Kenya", "Morocco", "Saudi Arabia", "United Arab Emirates",
        "Qatar", "Turkey", "Iran", "Iraq", "Pakistan", "Afghanistan", "Bangladesh", "Thailand", "Vietnam", "Indonesia",
        "Malaysia", "Philippines", "Canada", "Sweden", "Norway", "Denmark", "Finland", "Netherlands", "Belgium",
        "Switzerland", "Austria"],
    Math: ["Addition", "Subtraction", "Multiplication", "Division", "Addend", "Sum", "Subtrahend", "Difference",
        "Multiplier", "Product", "Multiplicand", "Quotient", "Dividend", "Divisor", "Exponent", "Square", "Cube",
        "Root", "Prime", "Composite", "Factor", "Factorization", "Fraction", "Numerator", "Denominator", "Decimal",
        "Percentage", "Ratio", "Proportion", "Equation", "Inequality", "Variable", "Constant", "Function", "Graph",
        "Coordinate", "Axis", "Slope", "Intercept", "Geometry", "Point", "Line", "Angle", "Triangle", "Circle",
        "Rectangle", "Square", "Quadrilateral", "Polygon", "Theorem"],
    Science: ["Physics", "Chemistry", "Biology", "Astronomy", "Geology", "Botany", "Zoology", "Genetics", "Evolution",
        "Microbiology", "Neuroscience", "Astronomer", "Biologist", "Chemist", "Physicist", "Geologist", "Botanist",
        "Zoologist", "Geneticist", "Microbiologist", "Neuroscience", "Atom", "Molecule", "Element", "Compound",
        "Reaction", "Periodic", "Newton", "Quantum", "Relativity", "Gravity", "Energy", "Force", "Electromagnetism",
        "Electron", "Proton", "Neutron", "DNA", "RNA", "Cell", "Organism", "Ecosystem", "Selection", "Mutation",
        "Fossil", "Climate", "Oxygen", "Carbon"],

};
const wordCat2 = {Random: ["Banana", "Sunshine", "Bicycle", "Castle", "Whisper", "Dragon", "Elephant",
        "Sunflower", "Butterfly", "Guitar", "Rainbow", "Whisper", "Candle", "Mountain", "Starlight", "Caramel",
        "Sparrow", "Breeze", "Canyon", "Lighthouse", "Serenade", "Firefly", "Waterfall", "Meadow", "Harmony",
        "Dandelion", "Eclipse", "Brook", "Sapphire", "Honeybee", "Jasmine", "Crimson", "Lullaby", "Cascade", "Velvet",
        "Moonlight", "Tornado", "Mystic", "Sapphire", "Wildflower", "Pebble", "Raindrop", "Petal", "Thunderstorm",
        "Tranquil", "Silhouette", "Crimson", "Lavender", "Sunbeam", "Stardust", "Sunrise", "Wanderlust", "Champagne",
        "Papillon","Serendipity", "Candlelight", "Sapphire", "Labyrinth", "Butterscotch", "Vivid", "Spectacle",
        "Symphony", "Dragonfly", "Effervescent"]
}
const PlayGame = () => {
    // State for the selected category
    const [selectedCategory, setSelectedCategory] = useState('Animals'); // Default category

    // State for the grid of words
    const [wordGrid, setWordGrid] = useState([]);

    // State for the player's score
    const { updateScores } = useScores();
    const [score, setScore] = useState(0);

    // State for the player's initials
    const [initials, setInitials] = useState('');

    // UseEffect hook to populate the word grid
    useEffect(() => {
        // Ensure selectedCategory exists in wordCategories and is an array
        if (Array.isArray(wordCategories[selectedCategory])) {
            const allWords = [...wordCategories[selectedCategory], ...wordCat2['Random']];
            const shuffledWords = allWords.sort(() => 0.5 - Math.random());
            setWordGrid(shuffledWords.slice(0, 9));
        } else {
            console.error(`Selected category "${selectedCategory}" is not valid`);
        }
    }, [selectedCategory]);

    const handleWordSelection = (word) => {
        if (wordCategories[selectedCategory].includes(word)) {
            setScore(prevScore => prevScore + 10);
        }
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const sendScoreToServer = () => {
        const serverUrl = 'http://localhost:3001/api/scores';

        // Create a JSON object with the player's initials and score
        const playerScore = {
            initials: initials,
            score: score
        };

        // Send a POST request to the server to store the score
        axios.post(serverUrl, playerScore)
            .then(response => {
                console.log('Score stored successfully:', response.data);
            })
            .catch(error => {
                console.error('Error storing score:', error);
            });

    };

    return (
        <div className="center-container"> {/* Wrap the entire content in a container */}
            <div className="category-select">
                <label1 htmlFor="categorySelect">Select a category:</label1>
                <select
                    id="categorySelect"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    
                >
                    {Object.keys(wordCategories).map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="word-grid">
                {wordGrid.map((word, index) => (
                   <button className="word-button" key={index} onClick={() => handleWordSelection(word)}>
                   {word}
               </button>
                ))}
            </div>
            <div className="score-display">
                Score: {score}
            </div>
            <div className="initials-input">
                <label2 htmlFor="initialsInput">Enter your initials:</label2>
                <input
                    type="text"
                    id="initialsInput"
                    value={initials}
                    onChange={(e) => setInitials(e.target.value)}
                />
            </div>
            <button className="submit-button" onClick={sendScoreToServer}>
                Submit Score
                </button>
        </div>
    );
}

export default PlayGame;