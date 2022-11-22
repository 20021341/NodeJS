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

module.exports = {
    handleCreateCard: handleCreateCard
}