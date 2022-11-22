let productService = require('../services/productService');

//req: product_line, quantity, facility_id
let handleCreateProduct = async (req, res) => {
    if (!req.body.product_line
        || !req.body.quantity
        || !req.body.facility_id) {
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

let handleRetrieveProduct = async (req, res) => {

}

let handleRepairProduct = async (req, res) => {

}

module.exports = {
    handleCreateProduct: handleCreateProduct,
    handleRelocateProduct: handleRelocateProduct
}