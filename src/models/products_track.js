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
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: 'products',
            referencesKey: 'product_id'
        },
        current_at: {
            type: DataTypes.INTEGER,
            references: 'facilities',
            referencesKey: 'facility_id'
        },
        status: DataTypes.STRING,
        is_defective: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Products_Track',
        timestamps: false,
        freezeTableName: true
    });
    return Products_Track;
};