'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Product.init({
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_line: DataTypes.STRING,
        manufacture_date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
        manufacture_at: {
            type: DataTypes.INTEGER,
            references: 'facilties',
            referencesKey: 'id'
        },
    }, {
        sequelize,
        modelName: 'Product',
        timestamps: false
    });
    return Product;
};