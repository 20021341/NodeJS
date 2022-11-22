const express = require('express');
const facilityController = require('../controllers/facilityController');
const productController = require('../controllers/productController');
const billController = require('../controllers/billController');
const cardController = require('../controllers/cardController');

let router = express.Router();

let initAPIRoutes = (app) => {
    router.get('/get-facility', facilityController.handleGetFacilityByID);
    router.get('/get-all-facilities', facilityController.handleGetAllFacilities);

    router.post('/login', facilityController.handleLogin);
    router.post('/create-facility', facilityController.handleCreateFacility);
    router.post('/update-facility', facilityController.handleUpdateFacility);

    router.post('/create-products', productController.handleCreateProduct);
    router.post('/relocate-product', productController.handleRelocateProduct);

    router.post('/create-bill', billController.handleCreateBill);

    router.post('/create-card', cardController.handleCreateCard);

    return app.use('/api', router);
}

module.exports = initAPIRoutes;