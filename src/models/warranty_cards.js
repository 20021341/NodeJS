'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Warranty_Card extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Warranty_Card.init({
        card_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: 'products',
            referencesKey: 'product_id'
        },
        owner_id: {
            type: DataTypes.INTEGER,
            references: 'users',
            referencesKey: 'id'
        },
        mt_center_id: {
            type: DataTypes.INTEGER,
            references: 'users',
            referencesKey: 'id'
        },
        create_date: DataTypes.DATE,
        return_date: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Warranty_Card',
        timestamps: false,
        freezeTableName: true
    });
    return Warranty_Card;
};