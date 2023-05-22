const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db.sqlite');
const isAuth = require('../middleware/isAuth');


// Inscription
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Hash du mot de passe avant de le sauvegarder
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            let sql = `INSERT INTO users(name, email, password) VALUES(?,?,?)`;
            db.run(sql, [name, email, hash], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                // get the last insert id
                console.log(`A row has been inserted with rowid ${this.lastID}`);
                res.send('User registered')
            });
        });
    });
});

// Connexion
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.send("Successfully Authenticated");
                console.log(req.user);
            });
        }
    })(req, res, next);
});

router.get('/profile', isAuth, (req, res) => {
    res.send(req.user);
});




module.exports = router;

