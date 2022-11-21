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
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        cpu: DataTypes.STRING,
        gpu: DataTypes.STRING,
        ram: DataTypes.STRING,
        rom: DataTypes.STRING,
        resolution: DataTypes.STRING,
        screen_size: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Product_Line',
        timestamps: false
    });
    return Product_Line;
};