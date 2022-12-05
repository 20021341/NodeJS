let productService = require('../services/productService');

// facility_id
let handleGetGoodProducts = async (req, res) => {
    if (!req.query.facility_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let data = await productService.getGoodProducts(req.query);

    if (data.errCode === 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Get new products success',
            products: data.products
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: data.message,
        });
    }
}

// facility_id
let handleGetBadProducts = async (req, res) => {
    if (!req.query.facility_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let data = await productService.getBadProducts(req.query);

    if (data.errCode === 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Get defective products success',
            products: data.products
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: data.message,
        });
    }
}

let handleGetProductsOfCustomer = async (req, res) => {
    if (!req.query.customer_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let data = await productService.getProductsOfCustomer(req.query.customer_id);

    if (data.errCode === 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            products: data.products
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: data.message,
        });
    }
}

module.exports = {
    handleGetGoodProducts: handleGetGoodProducts,
    handleGetBadProducts: handleGetBadProducts,
    handleGetProductsOfCustomer: handleGetProductsOfCustomer
}