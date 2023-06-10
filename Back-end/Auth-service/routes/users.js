const express = require('express');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./auth-db.sqlite');
const router = express.Router();

router.use(express.json());

const jwt = require('jsonwebtoken');

router.post('/login', (req, res, next) => {
    const { name, password } = req.body;

    let sql = `SELECT * FROM users WHERE name = ? AND password = ?`;
    db.get(sql, [name, password], function(err, row) {
        if (err) {
            console.log(err);
            console.log(req.body);
            return res.status(500).json({ error: err.message });
        }

        if (row) {
            console.log(`A user has logged in: ${name}`);

            console.log("Data to be encoded in JWT:", { id: row.id, role: row.role });  // Ajout de cette ligne

            // Inclure le rôle de l'utilisateur dans le jeton JWT
            const token = jwt.sign({ id: row.id, role: row.role }, 'your_secret_key', { expiresIn: '1h' });

            res.status(201).json({ message: `${name} has logged in`, token: token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});


// Inscription
router.post('/register', (req, res) => {
    const { name, role, password } = req.body;

    let sql = `INSERT INTO users(name, role, password) VALUES(?,?,?)`;
    db.run(sql, [name, role, password], function(err) {
        if (err) {
            console.log(err);
            console.log(req.body);
            return res.status(500).json({ error: err.message});
        }

        // Get the last insert id
        console.log(`A user has been inserted with rowid ${this.lastID}`);
        res.status(201).json({ message: 'User registered' });
    });
});

module.exports = router;
