/**
 * On va loader tous les éléments utilisés par l'application
 * On l'importe dans le point d'entrée (./bin/www) 
 */

// Définition des librairies utilisés
const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, './public');

// ROUTES : Loader les routes que j'ai défini dans le répertoire (./routes)
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

// ROUTES : utilisé les routes que j'ai défini
app.use('/', indexRouter);
app.use('/api', apiRouter);

// Utilisé tous les fichiers dans le repertoire public
app.use(express.static(publicPath));

// VIEWS : setter le template qu'on va utilisé (twig)
app.set('view engine', 'twig');
// VIEWS : définir le répértoire twig qu'on a besoin pour les fichiers
app.set('views', path.join(__dirname, 'templates'));

// valeur retourné
module.exports = app;