'use strict';
const { Model } = require('sequelize');

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
        model_name: DataTypes.STRING,
        warranty_time: DataTypes.INTEGER,
        manufacture_date: DataTypes.INTEGER,
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