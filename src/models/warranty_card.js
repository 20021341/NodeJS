'use strict';
const {
    Model, Sequelize
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
            primaryKey: true
        },
        product_id: {
            type: DataTypes.STRING,
            references: 'products',
            referencesKey: 'product_id'
        },
        create_at: {
            type: DataTypes.STRING,
            references: 'facilities',
            referencesKey: 'facility_id'
        },
        maintain_at: {
            type: DataTypes.STRING,
            references: 'facilities',
            referencesKey: 'facility_id'
        },
        customer_id: {
            type: DataTypes.STRING,
            references: 'customers',
            referencesKey: 'customer_id'
        },
        create_date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Warranty_Card',
        timestamps: false,
    });
    return Warranty_Card;
};