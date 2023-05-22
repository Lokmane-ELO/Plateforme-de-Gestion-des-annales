const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db.sqlite');
const isAuth = require('../middleware/isAuth');

router.post('/', isAuth, (req, res) => {
    const { name, url } = req.body;

    let sql = `INSERT INTO examPapers(name, url) VALUES(?,?)`;
    db.run(sql, [name, url], function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        res.send('ExamPaper created')
    });
});

router.get('/', (req, res) => {
    let sql = `SELECT * FROM examPapers`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

// Lister toutes les annales d'examen
router.get('/', (req, res) => {
    let sql = `SELECT * FROM examPapers`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

// Obtenir une annale d'examen spécifique
router.get('/:id', (req, res) => {
    let sql = `SELECT * FROM examPapers WHERE id = ?`;
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return console.log(err.message);
        }
        res.send(row);
    });
});

// Mettre à jour une annale d'examen spécifique
router.put('/:id', isAuth, (req, res) => {
    const { name, url } = req.body;

    let sql = `UPDATE examPapers SET name = ?, url = ? WHERE id = ?`;
    db.run(sql, [name, url, req.params.id], function(err) {
        if (err) {
            return console.log(err.message);
        }
        res.send(`Row(s) updated: ${this.changes}`);
    });
});

// Supprimer une annale d'examen spécifique
router.delete('/:id', isAuth, (req, res) => {
    let sql = `DELETE FROM examPapers WHERE id = ?`;
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            return console.log(err.message);
        }
        res.send(`Row(s) deleted ${this.changes}`);
    });
});

module.exports = router;
