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

    if (check) {
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

let handleRelocateProduct = async (req, res) => {

}

let handleRetrieveProduct = async (req, res) => {

}

let handleRepairProduct = async (req, res) => {

}

module.exports = {
    handleCreateProduct: handleCreateProduct
}