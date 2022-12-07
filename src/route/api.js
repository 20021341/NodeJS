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
    router.get('/get-good-products', siteController.handleGetGoodProducts);

    // Get products that need action (repair) in a facility
    // input: facility_id            
    // output: products 
    router.get('/get-bad-products', siteController.handleGetBadProducts);

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

    // Get a customer by id
    // input: customer_id           
    // output: customer with OK message, otherwise some errors
    router.get('/hq/get-customer-by-id', headquarterController.handleGetCustomerByID);

    // Get all product lines
    // input: none           
    // output: product lines with OK message, otherwise some errors
    router.get('/hq/get-all-product-lines', headquarterController.handleGetAllProductLines);

    // Create new product line
    // input: all product line properties           
    // output: OK message, otherwise some errors
    router.post('/hq/create-new-product-line', headquarterController.handleCreateNewProductLine);

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

    // Get bills created at this agent
    router.get('/agent/get-bills-by-agent-id', agentController.handleGetBillsByAgentID)

    // Get cards created at this agent
    router.get('/agent/get-cards-by-agent-id', agentController.handleGetCardsByAgentID)

    // Get defective products need retrieving from customers
    router.get('/agent/get-products-need-retrieving', agentController.handleGetProductsNeedRetrieving)


    /**
     * Maintainance center API
     */

    // Repair products, some can be repaired will be delivered to the agent where they came from, 
    // some cannot will be delivered to the factory where they've been produced
    // input: center_id
    // output: OK message, otherwise some errors
    router.post('/center/repair-products', centerController.handleRepairProducts);

    // Move products those cannot be repaired to factories where they were produced
    // input: center_id
    // output: OK message, otherwise some errors
    router.post('/center/deliver-broken-products', centerController.handleDeliverBrokenProducts);


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

    // Repair products, some can be repaired, some cannot
    // input: factory_id
    // output: OK message, otherwise some errors
    router.post('/factory/repair-products', factoryController.handleRepairProducts);

    // Report which product line is defective
    // input: factory_id, product_line
    // output: OK message, otherwise some errors
    router.post('/factory/report-defective-products', factoryController.handleReportDefectiveProductLine);

    return app.use('/api', router);
}

module.exports = initAPIRoutes;