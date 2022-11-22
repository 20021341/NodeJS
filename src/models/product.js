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
            type: DataTypes.STRING,
            primaryKey: true,
        },
        product_line: {
            type: DataTypes.STRING,
            references: 'product_lines',
            referencesKey: 'product_line'
        },
        manufacture_date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
        manufacture_at: {
            type: DataTypes.STRING,
            references: 'facilties',
            referencesKey: 'facility_id'
        },
    }, {
        sequelize,
        modelName: 'Product',
        timestamps: false
    });
    return Product;
};