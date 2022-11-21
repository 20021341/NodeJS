const express = require('express');
const userController = require('../controllers/userController');

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/api/users/get-user', userController.handleGetUserByID);
    router.get('/api/users/get-all-users', userController.handleGetAllUsers);

    router.post('/api/login', userController.handleLogin);
    router.post('/api/create-facility', userController.handleCreateUser);
    router.post('/api/update-facility', userController.handleUpdateUser);
    return app.use('/', router);
}

module.exports = initWebRoutes;