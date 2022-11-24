const db = require('../models/index');
const { getFacilityInfoByID } = require('./facilityService')

let login = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let facilityData = await getFacilityInfoByID(data.facility_id);

            if (facilityData.errCode === 0) {
                if (data.password.localeCompare(facilityData.facility.password) == 0) {
                    resolve({
                        errCode: 0,
                        message: 'OK',
                        facility: facilityData.facility
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: 'Wrong password'
                    })
                }
            } else {
                resolve({
                    errCode: 2,
                    message: 'Facility not found'
                })
            }
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    login: login
}