const express = require('express');
const facilityController = require('../controllers/facilityController');
const factoryController = require('../controllers/factoryController');
const agentController = require('../controllers/agentController');
const centerController = require('../controllers/centerController');
const productController = require('../controllers/productController');


let router = express.Router();

let initAPIRoutes = (app) => {
    router.get('/get-facility', facilityController.handleGetFacilityByID);
    router.get('/get-all-facilities', facilityController.handleGetFacilitiesByRole);

    router.post('/agent/create-bill', agentController.handleCreateBill);
    router.post('/agent/create-card', agentController.handleCreateCard);
    router.post('/agent/deliver-customers-product', agentController.handleDeliverCustomersProduct);
    router.post('/agent/deliver-defective-products', agentController.handleDeliverDefectiveProducts);

    router.post('/center/repair-product', centerController.handleRepairProduct);

    router.post('/login', facilityController.handleLogin);
    router.post('/create-facility', facilityController.handleCreateFacility);
    router.post('/update-facility', facilityController.handleUpdateFacility);

    router.post('/factory/create-products', factoryController.handleCreateProduct);
    router.post('/relocate-product', productController.handleRelocateProduct);

    return app.use('/api', router);
}

module.exports = initAPIRoutes;