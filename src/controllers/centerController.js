let centerService = require('../services/centerService');

//center_id
let handleRepairProducts = async (req, res) => {
    if (!req.body.center_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await centerService.repairProducts(req.body)

    if (check.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: check.message,
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: check.message,
        });
    }
}

//center_id
let handleDeliverBrokenProducts = async (req, res) => {
    if (!req.body.center_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await centerService.deliverBrokenProducts(req.body)

    if (check.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: check.message,
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: check.message,
        });
    }
}

module.exports = {
    handleRepairProducts: handleRepairProducts,
    handleDeliverBrokenProducts: handleDeliverBrokenProducts
}