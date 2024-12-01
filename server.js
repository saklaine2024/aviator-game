const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',    // Replace with your MySQL username
    password: '',    // Replace with your MySQL password
    database: 'aviator_game'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL');
});

// Save score to database
app.post('/save-score', (req, res) => {
    const { playerName, score } = req.body;

    const query = 'INSERT INTO scores (playerName, score) VALUES (?, ?)';
    db.query(query, [playerName, score], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to save score' });
            return;
        }
        res.status(200).json({ message: 'Score saved successfully', result });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
