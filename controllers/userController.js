const models = require('../models');

module.exports = {

    // Formulaire nouvel utilisateur
    register: async (req, res) => {
        // récupération formulaire
        res.render('users/register', {
            title: 'Chat App Master userController'
        });
    },

    // Enregistrement nouvel utilisateur
    registerSave: async (req, res) => {

        try {
            // Données envoyés par le post
            const data = req.body;

            // création transaction géré automatiquement
            const result = await models.sequelize.transaction(async (t) => {
                // création de l'utilisateur en ajoutant le transaction t
                const user = await models.User.create({
                    email: data.email,
                    firstName: data.firstname,
                    lastName: data.lastname,
                    username: data.username,
                    passwd: data.password
                }, {transaction: t});
                // on devra retourner un objet
                return user;
            });

            // retour JSON du fonction
            res.status(200).json({
                code: 'SUCCES_CREATE_USER',
                message: 'Enregistrement avec succès' 
            });
        } catch (error) {
            // s'il y a une erreur de transaction
            res.status(500).json({
                code: 'ERROR_CREATE_USER',
                message: 'Echec enregistrement',
                error: error 
            });
        }
        
    }

}