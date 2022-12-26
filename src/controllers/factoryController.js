let productService = require('../services/productService');
let factoryService = require('../services/factoryService');


// factory_id, year
let handleGetDefectiveOverProduceStatistics = async (req, res) => {
    if (!req.query.factory_id
        || !req.query.year) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let data = await factoryService.getDefectiveOverProduceStatistics(req.query)

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        statistics: data.statistics
    })
}

// factory_id, year
let handleGetSalesOverProduceStatistics = async (req, res) => {
    if (!req.query.factory_id
        || !req.query.year) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let data = await factoryService.getSalesOverProduceStatistics(req.query)

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        statistics: data.statistics
    })
}

//req: product_line, quantity, factory_id
let handleCreateProduct = async (req, res) => {
    if (!req.body.product_line
        || !req.body.quantity
        || !req.body.factory_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let check = await productService.createProduct(req.body)

    return res.status(200).json({
        errCode: check.errCode,
        message: check.message,
    })
}

// factory_id, agent_id, product_line, quantity
let handleDeliverProducts = async (req, res) => {
    if (!req.body.factory_id
        || !req.body.agent_id
        || !req.body.product_line
        || !req.body.quantity) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let check = await factoryService.deliverProducts(req.body)

    return res.status(200).json({
        errCode: check.errCode,
        message: check.message,
    })
}

// factory_id
let handleRecycleProducts = async (req, res) => {
    if (!req.body.factory_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let check = await factoryService.recycleProducts(req.body)

    return res.status(200).json({
        errCode: check.errCode,
        message: check.message,
    })
}

// factory_id
let handleRepairProducts = async (req, res) => {
    if (!req.body.factory_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let check = await factoryService.repairProducts(req.body)

    return res.status(200).json({
        errCode: check.errCode,
        message: check.message,
    })
}

// factory_id, product_line
let handleReportDefectiveProductLine = async (req, res) => {
    if (!req.body.product_line
        || !req.body.factory_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let check = await factoryService.reportDefectiveProductLine(req.body)

    return res.status(200).json({
        errCode: check.errCode,
        message: check.message,
    })
}

module.exports = {
    handleCreateProduct: handleCreateProduct,
    handleDeliverProducts: handleDeliverProducts,
    handleRecycleProducts: handleRecycleProducts,
    handleRepairProducts: handleRepairProducts,
    handleReportDefectiveProductLine: handleReportDefectiveProductLine,
    handleGetSalesOverProduceStatistics: handleGetSalesOverProduceStatistics,
    handleGetDefectiveOverProduceStatistics: handleGetDefectiveOverProduceStatistics
}