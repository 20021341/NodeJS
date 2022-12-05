'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product_Line extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Product_Line.init({
        product_line: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        cpu: DataTypes.STRING,
        gpu: DataTypes.STRING,
        ram: DataTypes.STRING,
        memory: DataTypes.STRING,
        display: DataTypes.STRING,
        warranty_period: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Product_Line',
        timestamps: false
    });
    return Product_Line;
};