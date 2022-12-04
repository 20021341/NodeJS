const express = require('express');
const homeController = require('../controllers/homeController');
const siteController = require('../controllers/siteController');
const headquarterController = require('../controllers/headquarterController');
const factoryController = require('../controllers/factoryController');
const agentController = require('../controllers/agentController');
const centerController = require('../controllers/centerController');


let router = express.Router();

let initAPIRoutes = (app) => {
    /**
     * Note: get method uses query as input, post method uses body
     */


    /**
     * Home and site API
     */

    // Login
    // input: facility_id, password          
    // output: facility info if login success
    router.post('/login', homeController.handleLogin);

    // Get new products (ownerless, non-defective) in a facility
    // input: facility_id            
    // output: products in format [product_line, quantity]
    router.get('/get-new-products', siteController.handleGetNewProducts);

    // Get products that need action (repair) in a facility
    // input: facility_id            
    // output: products 
    router.get('/get-need-action-products', siteController.handleGetNeedActionProducts);

    // Get products of customer
    // input: customer_id       
    // output: products 
    router.get('/get-products-of-customer', siteController.handleGetProductsOfCustomer);


    /**
     * Headquarter API
     */

    // Get all facilities
    // input: none           
    // output: facilities with OK message, otherwise some errors
    router.get('/hq/get-all-facilities', headquarterController.handleGetAllFacilities);

    // Get all facilities
    // input: none           
    // output: facilities with OK message, otherwise some errors
    router.get('/hq/get-facilities-by-role', headquarterController.handleGetAllFacilitiesByRole);

    // Get all customers
    // input: none           
    // output: customers with OK message, otherwise some errors
    router.get('/hq/get-all-customers', headquarterController.handleGetAllCustomers);

    // Create a new facility
    // input: facility_name, phone_number, address, role         
    // output: OK message, otherwise some errors
    router.post('/hq/create-facility', headquarterController.handleCreateFacility);


    /**
     * Agent API
     */

    // Create bill
    // input: product_line, quantity, agent_id, customer_id, fullname, phone_number
    // output: OK message, otherwise some errors
    router.post('/agent/create-bill', agentController.handleCreateBill);

    // Create card
    // input: product_id, agent_id, center_id, customer_id
    // output: OK message, otherwise some errors
    router.post('/agent/create-card', agentController.handleCreateCard);

    // Deliver products that belong to customers in an agent to the maintainance center chosen before
    // input: agent_id
    // output: OK message, otherwise some errors
    router.post('/agent/deliver-customers-products', agentController.handleDeliverCustomersProducts);

    // Deliver products detected to be defective in a agent to a maintainance center 
    // A temporary warranty card will be created for each product and will be discarded when the mt-center done repairing 
    // input: agent_id, center_id
    // output: OK message, otherwise some errors
    router.post('/agent/deliver-defective-products', agentController.handleDeliverDefectiveProducts);


    /**
     * Maintainance center API
     */

    // Repair products, some can be repaired will be delivered to the agent where they came from, 
    // some cannot will be delivered to the factory where they've been produced
    // input: center_id, product_id
    // output: OK message, otherwise some errors
    router.post('/center/repair-product', centerController.handleRepairProduct);


    /**
     * Factory API
     */

    // Produce some products of a certain product line
    // input: factory_id, product_line, quantity
    // output: OK message, otherwise some errors
    router.post('/factory/create-products', factoryController.handleCreateProduct);

    // Deliver products of a certain product line to agent
    // input: factory_id, agent_id, product_line, quantity
    // output: OK message, otherwise some errors
    router.post('/factory/deliver-products', factoryController.handleDeliverProducts);

    // Recycle defective products
    // input: factory_id
    // output: OK message, otherwise some errors
    router.post('/factory/recycle-products', factoryController.handleRecycleProducts);

    // Announce which product line is defective
    // input: factory_id, product_line
    // output: OK message, otherwise some errors
    router.post('/factory/announce-defective-products', factoryController.handleAnnounceDefectiveProductLine);

    return app.use('/api', router);
}

module.exports = initAPIRoutes;