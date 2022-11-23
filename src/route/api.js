const express = require('express');
const headquarterController = require('../controllers/headquarterController');
const factoryController = require('../controllers/factoryController');
const agentController = require('../controllers/agentController');
const centerController = require('../controllers/centerController');


let router = express.Router();

let initAPIRoutes = (app) => {
    router.get('/get-facility', headquarterController.handleGetFacilityByID);
    router.get('/get-all-facilities', headquarterController.handleGetFacilitiesByRole);

    router.post('/agent/create-bill', agentController.handleCreateBill);
    router.post('/agent/create-card', agentController.handleCreateCard);
    router.post('/agent/deliver-customers-product', agentController.handleDeliverCustomersProduct);
    router.post('/agent/deliver-defective-products', agentController.handleDeliverDefectiveProducts);

    router.post('/center/repair-product', centerController.handleRepairProduct);

    router.post('/login', headquarterController.handleLogin);
    router.post('/create-facility', headquarterController.handleCreateFacility);
    router.post('/update-facility', headquarterController.handleUpdateFacility);

    router.post('/factory/create-products', factoryController.handleCreateProduct);
    router.post('/factory/deliver-products', factoryController.handleDeliverProducts);
    router.post('/factory/recycle-products', factoryController.handleRecycleProducts);

    return app.use('/api', router);
}

module.exports = initAPIRoutes;