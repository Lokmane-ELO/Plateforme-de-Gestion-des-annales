const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./auth-db.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the auth-db SQLite database.');
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Created users table in auth-db.');
    });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});
