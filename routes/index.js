/**
 * ROUTES WEB : listes des routes possible
 * Cette fonction devra retourner un router pour que cela soit valable dans l'application
 * Et qu'on l'importe dans le fichier racine app.js
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Chat App Master'
    });
});

module.exports = router;