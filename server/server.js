const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const cors = require('cors');
const playerScores = [];
const app = express();
const port = 3001; // Different from the React app's port
app.get('/api/leaderboard', (req, res) => {
    // Retrieve leaderboard data from your data source (e.g., a database)
    // Respond with the leaderboard data in JSON format
    const leaderboardData = [
        { name: 'Player 1', score: 100 },
        { name: 'Player 2', score: 75 },
        { name: 'Player 3', score: 50 },
        { name: 'Player 4', score: 25 },
    ];
    res.json(leaderboardData);
});
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // For parsing application/json
app.post('/api/scores', (req, res) => {
    const { initials, score } = req.body;

    // Store the received data locally (in-memory)
    playerScores.push({ initials, score });

    // Respond with a success message or appropriate status code
    res.json({ message: 'Score saved locally' });
});
// Setup for the SQLite database
const dbPath = path.resolve(__dirname, 'capstone.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeDatabase();
    }
});

app.get('/', (req, res) => {
    res.send('Jeopardy Word Search Game Server is running!');
});
// Initialize the database with tables
function initializeDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL,
        category_id INTEGER,
        FOREIGN KEY (category_id) REFERENCES categories (id)
    )`);
}

// Routes
app.get('/api/words', (req, res) => {
    db.all("SELECT * FROM words", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

// Additional route example for adding a new word
app.post('/api/words', (req, res) => {
    const { word, categoryId } = req.body;
    db.run('INSERT INTO words (word, category_id) VALUES (?, ?)', [word, categoryId], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'success', id: this.lastID });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Handle closing the database connection when the server stops
process.on('SIGINT', () => {
    db.close(() => {
        console.log('SQLite database connection closed.');
        process.exit(0);
    });
});
