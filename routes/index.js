/**
 * ROUTES WEB : listes des routes possible
 * Cette fonction devra retourner un router pour que cela soit valable dans l'application
 * Et qu'on l'importe dans le fichier racine app.js
 */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

/**
 * POST
 * req.body undefined,
 * Ajouter cette méthode dans le ROUTER pour qu'on récupère les données posté en ajax dans le FRONT END
 */ 
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

// liste des controlleurs
const userController = require('../controllers/userController');

// Formulaire enregistrement nouvel utilisateur
router.get('/register', userController.register);
router.post('/registerSave', userController.registerSave);


module.exports = router;