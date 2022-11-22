'use strict';
const {
    Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bill extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Bill.init({
        bill_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.STRING,
            references: 'products',
            referencesKey: 'product_id'
        },
        customer_id: {
            type: DataTypes.STRING,
            references: 'customers',
            referencesKey: 'customer_id'
        },
        buy_date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
        buy_at: {
            type: DataTypes.STRING,
            references: 'facilties',
            referencesKey: 'facility_id'
        }
    }, {
        sequelize,
        modelName: 'Bill',
        timestamps: false,
    });
    return Bill;
};