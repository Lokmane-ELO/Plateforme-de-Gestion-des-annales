const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./exam-db.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the exam-db SQLite database.');
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS examPapers (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            url TEXT NOT NULL,
            date at TIME NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Created exams table in exam-db.');
    });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});
