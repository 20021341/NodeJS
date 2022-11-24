let facilityService = require('../services/facilityService');

let handleCreateFacility = async (req, res) => {
    if (!req.body.facility_name
        || !req.body.phone_number
        || !req.body.address
        || !req.body.role) {
        // khong nhap du thong tin
        return res.status(500).json({
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
        return res.status(500).json({
            errCode: 2,
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
        return res.status(500).json({
            errCode: 1,
            message: 'Get all fail',
        });
    }
}

module.exports = {
    handleCreateFacility: handleCreateFacility,
    handleGetAllFacilities: handleGetAllFacilities
}