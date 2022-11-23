let productService = require('../services/productService');
let factoryService = require('../services/factoryService');

//req: product_line, quantity, factory_id
let handleCreateProduct = async (req, res) => {
    if (!req.body.product_line
        || !req.body.quantity
        || !req.body.factory_id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await productService.createProduct(req.body)

    if (check.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Create products success',
        });
    } else {
        return res.status(500).json({
            errCode: 1,
            message: check.message,
        });
    }
}

// factory_id, product_line
let handleRetriveDefectiveProductLine = async (req, res) => {

}

module.exports = {
    handleCreateProduct: handleCreateProduct,
}