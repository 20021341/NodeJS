let facilityService = require('../services/facilityService');

let handleLogin = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let data = await facilityService.facilityLogin(req.body.username, req.body.password);

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        user: data.facility ? data.facility : {},
    });
}

let handleCreateFacility = async (req, res) => {
    if (!req.body.name
        || !req.body.username
        || !req.body.password
        || !req.body.address
        || !req.body.role) {
        // khong nhap du thong tin
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters',
        });
    }

    let check = await facilityService.createNewFacility(req.body);

    if (check) {
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
    if (!req.body.name
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
    if (!req.query.id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing query parameters',
        });
    }

    let data = await facilityService.getFacilityInfoByID(req.query.id);

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        user: data.facility ? data.facility : {},
    });
}

let handleGetAllFacilities = async (req, res) => {
    let data = await facilityService.getAllUsers();

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        user: data.facilities ? data.facilities : {},
    });
}

module.exports = {
    handleLogin: handleLogin,
    handleCreateFacility: handleCreateFacility,
    handleUpdateFacility: handleUpdateFacility,
    handleGetFacilityByID: handleGetFacilityByID,
    handleGetAllFacilities: handleGetAllFacilities,
}