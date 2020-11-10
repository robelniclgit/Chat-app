/**
 * On va loader tous les éléments utilisés par l'application
 * On l'importe dans le point d'entrée (./bin/www) 
 */

// Définition des librairies utilisés
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, './public');

// VARIABLE CONSTANTE : les constantes utilisés dans l'application
const {
    SESS_NAME = 'sid',
    SESS_LIFETIME = 1000 * 60 * 60 * 2, // two hours
    SESS_SECRET = '!dFiao/f.Ioz,rio'
} = process.env;

/**
 * IMPORTANT : https://stackoverflow.com/questions/39796228/req-session-is-undefined-using-express-session
 * L'ordre doit être modifié comme ceci (session avant les routes)
 * app.use(session(...));
 * app.use(router);
 * SINON req.session sera undefined
 * 
 */
// COOKIE : initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());
// SESSION COOKIE, option secure, premier proxy qu'on devra définir sinon la session ne sera pas défini
// app.set('trust proxy', 1);
// SESSION : si pas compris regardez la documentation du plugins express-session
// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    name: SESS_NAME,
    resave: true,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        /**
         * SESSION COOKIE : option secure
         * HTTPS est nécessaire pour sécuriser les cookies
         * Si secure est défini et que vous accédez à votre site via HTTP, le cookie ne sera pas défini
         * vous devez définir "trust proxy" dans express, si c'est du HTTP
         */
        // secure: true,
        sameSite: true,
        maxAge: SESS_LIFETIME
    }
}));

// CORS est un package node.js pour fournir un middleware Connect / Express
app.use(cors());

// ROUTES : Loader les routes que j'ai défini dans le répertoire (./routes)
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

// ROUTES : utilisé les routes que j'ai défini
app.use('/', indexRouter);
app.use('/api', apiRouter);

// Utilisé tous les fichiers dans le repertoire public
app.use(express.static(publicPath));

// DATA PARSING : Méthode permettant de parser les données poster ou reçu dans les méthod en JSON
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// VIEWS : setter le template qu'on va utilisé (twig)
app.set('view engine', 'twig');
// VIEWS : définir le répértoire twig qu'on a besoin pour les fichiers
app.set('views', path.join(__dirname, 'templates'));

// valeur retourné
module.exports = app;