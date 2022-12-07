let agentService = require('../services/agentService');
let billService = require('../services/billService');
let cardService = require('../services/cardService');

let handleCreateCard = async (req, res) => {
    if (!req.body.product_id
        || !req.body.agent_id
        || !req.body.center_id
        || !req.body.customer_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await cardService.createCard(req.body)

    if (check.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Create card success',
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: check.message,
        });
    }
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
            message: 'Missing input paramters',
        });
    }

    let check = await billService.createBill(req.body)

    if (check.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Create bill success',
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: check.message,
        });
    }
}

// agent_id
let handleDeliverCustomersProducts = async (req, res) => {
    if (!req.body.agent_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await agentService.deliverCustomersProducts(req.body)

    if (check.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Deliver success',
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: check.message,
        });
    }
}

// agent_id, center_id
let handleDeliverDefectiveProducts = async (req, res) => {
    if (!req.body.agent_id
        || !req.body.center_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await agentService.deliverDefectiveProducts(req.body)

    if (check.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Deliver success',
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: check.message,
        });
    }
}

let handleGetBillsByAgentID = async (req, res) => {
    if (!req.query.agent_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let data = await billService.getBillsByAgentID(req.query)

    if (data.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            bills: data.bills
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: data.message,
        });
    }
}

let handleGetCardsByAgentID = async (req, res) => {
    if (!req.query.agent_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let data = await cardService.getCardsByAgentID(req.query)

    if (data.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            cards: data.cards
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: data.message,
        });
    }
}

let handleGetProductsNeedRetrieving = async (req, res) => {
    if (!req.query.agent_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let data = await agentService.getProductsNeedRetrieving(req.query)

    if (data.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            products: data.products
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: data.message,
        });
    }
}

module.exports = {
    handleDeliverCustomersProducts: handleDeliverCustomersProducts,
    handleDeliverDefectiveProducts: handleDeliverDefectiveProducts,
    handleCreateBill: handleCreateBill,
    handleCreateCard: handleCreateCard,
    handleGetBillsByAgentID: handleGetBillsByAgentID,
    handleGetCardsByAgentID: handleGetCardsByAgentID,
    handleGetProductsNeedRetrieving: handleGetProductsNeedRetrieving
}