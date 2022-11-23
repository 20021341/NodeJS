'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products_Track extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Products_Track.init({
        product_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: 'products',
            referencesKey: 'product_id'
        },
        current_at: {
            type: DataTypes.STRING,
            references: 'facilities',
            referencesKey: 'facility_id'
        },
        owner: {
            type: DataTypes.STRING,
            references: 'customers',
            referencesKey: 'customer_id'
        },
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Products_Track',
        timestamps: false,
        freezeTableName: true
    });
    return Products_Track;
};