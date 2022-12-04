let centerService = require('../services/centerService');

let handleRepairProduct = async (req, res) => {
    if (!req.body.center_id
        || !req.body.product_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await centerService.repairProduct(req.body)

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
    handleRepairProduct: handleRepairProduct,
}