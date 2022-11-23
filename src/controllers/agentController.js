let agentService = require('../services/agentService');

// agent_id
let handleDeliverProduct = async (req, res) => {
    if (!req.body.agent_id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await agentService.deliverProductFromAgent(req.body)

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
    handleDeliverProduct: handleDeliverProduct
}