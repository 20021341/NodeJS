let agentService = require('../services/agentService');
let billService = require('../services/billService');
let cardService = require('../services/cardService');

// agent_id, year, product_line
let handleGetSalesStatisticsByProductLine = async (req, res) => {
    if (!req.query.agent_id
        || !req.query.year
        || !req.query.product_line) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let data = await agentService.getSalesStatisticsByProductLine(req.query)

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        statistics: data.statistics
    })
}

let handleCreateCard = async (req, res) => {
    if (!req.body.product_id
        || !req.body.agent_id
        || !req.body.center_id
        || !req.body.customer_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let check = await cardService.createCard(req.body)

    return res.status(200).json({
        errCode: check.errCode,
        message: check.message,
    })
}

// product_line, quantity, agent_id, customer_id, fullname, phone_number
let handleCreateBill = async (req, res) => {
    if (!req.body.product_line
        || !req.body.quantity
        || !req.body.agent_id
        || !req.body.customer_id
        || !req.body.fullname
        || !req.body.phone_number) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let check = await billService.createBill(req.body)

    return res.status(200).json({
        errCode: check.errCode,
        message: check.message,
    })
}

// agent_id
let handleDeliverCustomersProducts = async (req, res) => {
    if (!req.body.agent_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let check = await agentService.deliverCustomersProducts(req.body)

    return res.status(200).json({
        errCode: check.errCode,
        message: check.message,
    })
}

// agent_id, center_id
let handleDeliverDefectiveProducts = async (req, res) => {
    if (!req.body.agent_id
        || !req.body.center_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let check = await agentService.deliverDefectiveProducts(req.body)

    return res.status(200).json({
        errCode: check.errCode,
        message: check.message,
    })
}

let handleGetBillsByAgentID = async (req, res) => {
    if (!req.query.agent_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let data = await billService.getBillsByAgentID(req.query)

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        bills: data.bills
    })
}

let handleGetCardsByAgentID = async (req, res) => {
    if (!req.query.agent_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let data = await cardService.getCardsByAgentID(req.query)

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        cards: data.cards
    })
}

let handleGetProductsNeedRetrieving = async (req, res) => {
    if (!req.query.agent_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let data = await agentService.getProductsNeedRetrieving(req.query)

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        products: data.products
    })
}

module.exports = {
    handleGetSalesStatisticsByProductLine: handleGetSalesStatisticsByProductLine,
    handleDeliverCustomersProducts: handleDeliverCustomersProducts,
    handleDeliverDefectiveProducts: handleDeliverDefectiveProducts,
    handleCreateBill: handleCreateBill,
    handleCreateCard: handleCreateCard,
    handleGetBillsByAgentID: handleGetBillsByAgentID,
    handleGetCardsByAgentID: handleGetCardsByAgentID,
    handleGetProductsNeedRetrieving: handleGetProductsNeedRetrieving
}