const models = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

    // Affichage de tous les utilisateurs de la base de données
    allUsers: async (req, res) => {
        const users = await models.User.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            attributes: {
                exclude: ['passwd']
            }
        });
        res.render('users/list', {
            title: 'list all user userController',
            users: users
        });
    },

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
            // s'il y a erreur, ROLLBACK est executé automatiquement
            const result = await models.sequelize.transaction(async (t) => {
                // hasher le mot de passe avec bcrypt
                const hashPassword = await bcrypt.hash(data.password, saltRounds);
                
                // création de l'utilisateur en ajoutant le transaction t
                const user = await models.User.create({
                    email: data.email,
                    firstName: data.firstname,
                    lastName: data.lastname,
                    username: data.username,
                    passwd: hashPassword
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
        
    },

    // Formulaire authentification
    login: async (req, res) => {
        res.render('users/auth', {
            title: 'page authentification'
        });
    },

    // POST authentification utilisateur
    loginSave: async (req, res) => {
        // récupération des éléments postés
        const { username, password } = req.body;

        console.log('data posté', req.body);

        // vérifier les variables si ce n'est pas vide
        if( username=='' || password==''){
            return res.status(401).json({
                code: 'INVALID_CREDENTIALS',
                message: 'Invalid credentials'
            });
        }

        try {
            // on recherche l'utilisateur possédant l'username en cours
            const userTemp = await models.User.findOne({
                where: {
                    username: username
                }
            });

            // si on ne trouve pas l'username correspondant
            if(userTemp === null){
                return res.status(401).json({
                    code: 'INVALIDE_CREDENTIALS',
                    message: 'invalid credentials'
                });
            }

            // on vérifie si le mot de passe est compatible avec ceux dans la base de données
            const match = await bcrypt.compare(password, userTemp.passwd);
            if(!match){
                return res.status(401).json({
                    code: 'INVALIDE_CREDENTIALS',
                    message: 'invalid credentials'
                });
            }

            return res.status(200).json({
                code: 'VALIDE_CREDENTIALS',
                message: 'Authentification avec succès'
            });

        } catch (error) {
            
        }
    }

}