let centerService = require('../services/centerService');

// center_id, year, product_line
let handleGetWarrantyStatisticsByProductLine = async (req, res) => {
    if (!req.query.center_id
        || !req.query.year
        || !req.query.product_line) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let data = await centerService.getWarrantyStatisticsByProductLine(req.query)

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        statistics: data.statistics
    })
}

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
    handleDeliverBrokenProducts: handleDeliverBrokenProducts,
    handleGetWarrantyStatisticsByProductLine: handleGetWarrantyStatisticsByProductLine,
}