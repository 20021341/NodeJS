const Sequelize = require('sequelize');

let sequelize = new Sequelize('classicmodels', 'root', 'Ha23072002*#', {
    "host": "127.0.0.1",
    "port": "3307",
    "dialect": "mysql",
    "logging": false,
    "raw": true,
    "timezone": "+07:00"
});

/*
    Handle API
*/

let getAllTitle = async (req, res) => {
    try {
        let data = await sequelize.query(
            'SELECT * FROM title_basics ' +
            'WHERE primaryTitle = "Star Wars"'
        )

        return res.status(200).json({
            titles: data[0]
        })

    } catch (e) {
        return res.status(200).json({
            err: 1
        })
    }
}

module.exports = {
    getAllTitle: getAllTitle,
}