'use strict';
const {
    Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // un User peut avoir un ou plusieurs Tweet
            models.User.hasMany(models.Tweet);
        }
    };
    User.init({
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false
        },
        passwd: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};