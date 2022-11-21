'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product_Track extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Product_Track.init({
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: 'products',
            referencesKey: 'product_id'
        },
        current_at: {
            type: DataTypes.INTEGER,
            references: 'users',
            referencesKey: 'id'
        },
        next_at: {
            type: DataTypes.INTEGER,
            references: 'users',
            referencesKey: 'id'
        },
        status: DataTypes.STRING,
        can_repair: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Product_Track',
        timestamps: false,
        freezeTableName: true
    });
    return Product_Track;
};