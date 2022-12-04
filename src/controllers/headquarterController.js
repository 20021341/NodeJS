let facilityService = require('../services/facilityService');
let customerService = require('../services/customerService')

let handleCreateFacility = async (req, res) => {
    if (!req.body.facility_name
        || !req.body.phone_number
        || !req.body.address
        || !req.body.role) {
        // khong nhap du thong tin
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input parameters',
        });
    }

    let data = await facilityService.createFacility(req.body);

    if (data.errCode === 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Create facility success',
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Facility already exists',
        });
    }
}

let handleGetAllFacilities = async (req, res) => {
    let data = await facilityService.getAllFacilities();

    if (data.errCode === 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Get all success',
            facilities: data.facilities
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Get all fail',
        });
    }
}

let handleGetAllCustomers = async (req, res) => {
    let data = await customerService.getAllCustomers();

    if (data.errCode === 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Get all success',
            customers: data.customers
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Get all fail',
        });
    }
}

let handleGetAllFacilitiesByRole = async (req, res) => {
    if (!req.query.role) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let data = await facilityService.getAllFacilitiesByRole(req.query.role);

    if (data.errCode === 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Get all ' + req.query.role + ' success',
            facilities: data.facilities
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: data.message,
        });
    }
}

module.exports = {
    handleCreateFacility: handleCreateFacility,
    handleGetAllFacilities: handleGetAllFacilities,
    handleGetAllCustomers: handleGetAllCustomers,
    handleGetAllFacilitiesByRole: handleGetAllFacilitiesByRole
}