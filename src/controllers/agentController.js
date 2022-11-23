let agentService = require('../services/agentService');
let billService = require('../services/billService');
let cardService = require('../services/cardService');

let handleCreateCard = async (req, res) => {
    if (!req.body.product_id
        || !req.body.agent_id
        || !req.body.center_id
        || !req.body.customer_id) {
        return res.status(500).json({
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
        return res.status(500).json({
            errCode: 1,
            message: check.message,
        });
    }
}

let handleCreateBill = async (req, res) => {
    if (!req.body.product_id
        || !req.body.agent_id
        || !req.body.customer_id
        || !req.body.fullname
        || !req.body.phone_number) {
        return res.status(500).json({
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
        return res.status(500).json({
            errCode: 1,
            message: check.message,
        });
    }
}

// agent_id
let handleDeliverCustomersProduct = async (req, res) => {
    if (!req.body.agent_id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await agentService.deliverCustomersProduct(req.body)

    if (check.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Deliver success',
        });
    } else {
        return res.status(500).json({
            errCode: 1,
            message: check.message,
        });
    }
}

// agent_id, center_id
let handleDeliverDefectiveProducts = async (req, res) => {
    if (!req.body.agent_id
        || !req.body.center_id) {
        return res.status(500).json({
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
        return res.status(500).json({
            errCode: 1,
            message: check.message,
        });
    }
}

module.exports = {
    handleDeliverCustomersProduct: handleDeliverCustomersProduct,
    handleDeliverDefectiveProducts: handleDeliverDefectiveProducts,
    handleCreateBill: handleCreateBill,
    handleCreateCard: handleCreateCard
}