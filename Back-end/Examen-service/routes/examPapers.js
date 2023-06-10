const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./exam-db.sqlite');
const authorize = require('../authorize');
router.use(express.json());

router.post('/', authorize("admin"),(req, res) => {
    const { name, url, date } = req.body; // Ajouter la date ici

    let sql = `INSERT INTO examPapers(name, url , date) VALUES(?,?,?)`;
    db.run(sql, [name, url , date], function(err) { // Ajouter la date ici aussi
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
router.put('/:id', (req, res) => {
    const { name, url, date } = req.body; // Ajouter la date ici

    let sql = `UPDATE examPapers SET name = ?, url = ?, date = ? WHERE id = ?`; // Ajouter la date ici aussi
    db.run(sql, [name, url, date, req.params.id], function(err) { // Ajouter la date ici
        if (err) {
            return console.log(err.message);
        }
        res.send(`Row(s) updated: ${this.changes}`);
    });
});

// Supprimer une annale d'examen spécifique
router.delete('/:id', (req, res) => {
    let sql = `DELETE FROM examPapers WHERE id = ?`;
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            return console.log(err.message);
        }
        res.send(`Row(s) deleted ${this.changes}`);
    });
});

module.exports = router;
