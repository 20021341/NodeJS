let facilityService = require('../services/facilityService');
let customerService = require('../services/customerService');
const productService = require('../services/productService');

let handleCreateFacility = async (req, res) => {
    if (!req.body.facility_name
        || !req.body.password
        || !req.body.phone_number
        || !req.body.address
        || !req.body.role) {
        // khong nhap du thong tin
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let data = await facilityService.createFacility(req.body);

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
    })
}

let handleGetAllFacilities = async (req, res) => {
    let data = await facilityService.getAllFacilities();

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        facilities: data.facilities
    })
}

let handleGetAllCustomers = async (req, res) => {
    let data = await customerService.getAllCustomers();

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        customers: data.customers
    })
}

let handleGetCustomerByID = async (req, res) => {
    if (!req.query.customer_id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }
    let data = await customerService.getCustomerByID(req.query);

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        customer: data.customer
    })
}

let handleGetAllProductLines = async (req, res) => {
    let data = await productService.getAllProductLines()

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        product_lines: data.product_lines
    })
}

let handleGetAllFacilitiesByRole = async (req, res) => {
    if (!req.query.role) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let data = await facilityService.getAllFacilitiesByRole(req.query.role);

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        facilities: data.facilities
    })
}

let handleCreateNewProductLine = async (req, res) => {
    if (!req.body.product_line
        || !req.body.cpu
        || !req.body.gpu
        || !req.body.ram
        || !req.body.memory
        || !req.body.display
        || !req.body.warranty_period) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let check = await productService.createNewProductLine(req.body);

    return res.status(200).json({
        errCode: check.errCode,
        message: check.message,
    });
}

module.exports = {
    handleCreateFacility: handleCreateFacility,
    handleGetAllFacilities: handleGetAllFacilities,
    handleGetAllCustomers: handleGetAllCustomers,
    handleGetAllFacilitiesByRole: handleGetAllFacilitiesByRole,
    handleGetCustomerByID: handleGetCustomerByID,
    handleGetAllProductLines: handleGetAllProductLines,
    handleCreateNewProductLine: handleCreateNewProductLine
}