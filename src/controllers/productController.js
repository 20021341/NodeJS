let productService = require('../services/productService');

//req: product_line, quantity, facility_id
let handleCreateProduct = async (req, res) => {
    if (!req.body.quantity) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let check = await productService.createProducts(req.body)

    if (check.errCode == 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Create products success',
        });
    } else {
        return res.status(500).json({
            errCode: 2,
            message: 'Some error',
        });
    }
}

// req: product_id, source (facility_id), destination (facility_id)
let handleRelocateProduct = async (req, res) => {
    let check = await handleRelocateProduct(req.body)
}

let handleRetrieveProduct = async (req, res) => {

}

let handleRepairProduct = async (req, res) => {

}

module.exports = {
    handleCreateProduct: handleCreateProduct
}