const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');

const app = express();
const examPapers = require('./routes/examPapers');

// Configuration CORS
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à SQLite
let db = new sqlite3.Database('./exam-db.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to SQLite:', err);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

app.use('/examPapers', examPapers);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Démarrage du serveur
const port = 5000;
app.listen(port, () => {
    console.log(`Exam service is running on port ${port}`);
});

module.exports = app;
