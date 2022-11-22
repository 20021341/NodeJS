let billService = require('../services/billService');

let handleCreateBill = async (req, res) => {
    if (!req.body.product_id
        || !req.body.facility_id
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

module.exports = {
    handleCreateBill: handleCreateBill
}