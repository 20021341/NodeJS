const express = require('express');
const facilityController = require('../controllers/facilityController');

let router = express.Router();

let initAPIRoutes = (app) => {
    router.get('/api/get-facility', facilityController.handleGetFacilityByID);
    router.get('/api/get-all-facilities', facilityController.handleGetAllFacilities);

    router.post('/api/login', facilityController.handleLogin);
    router.post('/api/create-facility', facilityController.handleCreateFacility);
    router.post('/api/update-facility', facilityController.handleUpdateFacility);

    return app.use('/', router);
}

module.exports = initAPIRoutes;