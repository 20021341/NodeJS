let facilityService = require('../services/facilityService');

let handleLogin = async (req, res) => {
    if (!req.body.facility_id || !req.body.password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let data = await facilityService.facilityLogin(req.body.facility_id, req.body.password);

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        user: data.facility ? data.facility : {},
    });
}

let handleCreateFacility = async (req, res) => {
    if (!req.body.facility_name
        || !req.body.password
        || !req.body.phone_number
        || !req.body.address
        || !req.body.role) {
        // khong nhap du thong tin
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters',
        });
    }

    let data = await facilityService.createNewFacility(req.body);

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

let handleUpdateFacility = async (req, res) => {
    if (!req.body.facility_name
        || !req.body.phone_number
        || !req.body.address) {
        // khong nhap du thong tin
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters',
        });
    }

    let check = await facilityService.updateFacility(req.body);

    if (check) {
        return res.status(200).json({
            errCode: 0,
            message: 'Update facility success',
        });
    } else {
        return res.status(200).json({
            errCode: 3,
            message: 'Cannot update facility',
        });
    }
}

let handleGetFacilityByID = async (req, res) => {
    if (!req.query.facility_id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing query parameters',
        });
    }

    let data = await facilityService.getFacilityInfoByID(req.query.facility_id);

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        user: data.facility ? data.facility : {},
    });
}

let handleGetFacilitiesByRole = async (req, res) => {
    if (!req.query.role) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing query parameters',
        });
    }

    let data = await facilityService.getFacilitiesByRole(req.query);

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        user: data.facility ? data.facility : {},
    });
}

module.exports = {
    handleLogin: handleLogin,
    handleCreateFacility: handleCreateFacility,
    handleUpdateFacility: handleUpdateFacility,
    handleGetFacilityByID: handleGetFacilityByID,
    handleGetFacilitiesByRole: handleGetFacilitiesByRole,
}