let productService = require('../services/productService');

// facility_id
let handleGetGoodProducts = async (req, res) => {
    if (!req.query.facility_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let data = await productService.getGoodProducts(req.query);

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        products: data.products
    })
}

// facility_id
let handleGetBadProducts = async (req, res) => {
    if (!req.query.facility_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let data = await productService.getBadProducts(req.query);

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        products: data.products
    })
}

let handleGetProductsOfCustomer = async (req, res) => {
    if (!req.query.customer_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let data = await productService.getProductsOfCustomer(req.query.customer_id);

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        products: data.products
    })
}

module.exports = {
    handleGetGoodProducts: handleGetGoodProducts,
    handleGetBadProducts: handleGetBadProducts,
    handleGetProductsOfCustomer: handleGetProductsOfCustomer
}