let productService = require('../services/productService');

// req: product_id, source (facility_id), destination (facility_id)
let handleRelocateProduct = async (req, res) => {
    if (!req.body.product_id
        || !req.body.des_id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await productService.relocateProduct(req.body)

    if (check.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Relocate product success',
        });
    } else {
        return res.status(500).json({
            errCode: 1,
            message: check.message,
        });
    }
}

module.exports = {
    handleRelocateProduct: handleRelocateProduct
}