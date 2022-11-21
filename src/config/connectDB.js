const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('production_move', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;