let productService = require('../services/productService');
let factoryService = require('../services/factoryService');

//req: product_line, quantity, factory_id
let handleCreateProduct = async (req, res) => {
    if (!req.body.product_line
        || !req.body.quantity
        || !req.body.factory_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await productService.createProduct(req.body)

    if (check.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Create products success',
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: check.message,
        });
    }
}

// factory_id, agent_id, product_line, quantity
let handleDeliverProducts = async (req, res) => {
    if (!req.body.factory_id
        || !req.body.agent_id
        || !req.body.product_line
        || !req.body.quantity) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await factoryService.deliverProducts(req.body)

    if (check.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Deliver products success',
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: check.message,
        });
    }
}

// factory_id
let handleRecycleProducts = async (req, res) => {
    if (!req.body.factory_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await factoryService.recycleProducts(req.body)

    if (check.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Recycle products success',
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: check.message,
        });
    }
}

// factory_id
let handleRepairProducts = async (req, res) => {
    if (!req.body.factory_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await factoryService.repairProducts(req.body)

    if (check.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Repair products success',
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: check.message,
        });
    }
}

// factory_id, product_line
let handleReportDefectiveProductLine = async (req, res) => {
    if (!req.body.product_line
        || !req.body.factory_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await factoryService.reportDefectiveProductLine(req.body)

    if (check.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Report defective success',
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: check.message,
        });
    }
}

module.exports = {
    handleCreateProduct: handleCreateProduct,
    handleDeliverProducts: handleDeliverProducts,
    handleRecycleProducts: handleRecycleProducts,
    handleRepairProducts: handleRepairProducts,
    handleReportDefectiveProductLine: handleReportDefectiveProductLine,
}