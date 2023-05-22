// Importation des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const users = require('./routes/users');
const examPapers = require('./routes/examPapers');

// Création de l'application Express
const app = express();

// Configuration du middleware Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: "password",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
}));
const passport = require('passport');
require('./passportConfig')(passport);// Assurez-vous que cela pointe vers votre fichier passportConfig.js
app.use(passport.initialize());
app.use(passport.session());



// Configuration CORS
app.use(cors());

app.use(bodyParser.json())
// Routes API
app.use('/users', users);
app.use('/examPapers', examPapers);

// Connexion à SQLite
let db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to SQLite:', err);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Démarrage du serveur
const port =  3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

