/**
 * ROUTES API : listes des routes possible dans un API
 * Cette fonction devra retourner un router pour que cela soit valable dans l'application
 * Et qu'on l'importe dans le fichier racine app.js
 */
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('GET API request to the homepage');
});

module.exports = router;