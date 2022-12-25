let centerService = require('../services/centerService');

//center_id
let handleRepairProducts = async (req, res) => {
    if (!req.body.center_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let check = await centerService.repairProducts(req.body)

    return res.status(200).json({
        errCode: check.errCode,
        message: check.message,
    })
}

//center_id
let handleDeliverBrokenProducts = async (req, res) => {
    if (!req.body.center_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let check = await centerService.deliverBrokenProducts(req.body)

    return res.status(200).json({
        errCode: check.errCode,
        message: check.message,
    })
}

module.exports = {
    handleRepairProducts: handleRepairProducts,
    handleDeliverBrokenProducts: handleDeliverBrokenProducts
}