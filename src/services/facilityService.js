const db = require('../models/index');

let facilityLogin = (facility_id, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await getFacilityInfoByID(facility_id);

            if (data.errCode === 0) {
                if (password.localeCompare(data.facility.password) == 0) {
                    resolve({
                        errCode: 0,
                        message: 'OK',
                        facility: data.facility
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

let createNewFacility = (data) => {
    return new Promise(async (resolve, reject) => {
        let new_facility_id = ""
        while (true) {
            new_facility_id = data.role + Math.floor(Math.random() * 1000).toString()
            let facilityData = await getFacilityInfoByID(new_facility_id)
            if (facilityData.errCode !== 0) {
                break
            }
        }

        try {
            await db.Facility.create({
                facility_id: new_facility_id,
                password: data.password,
                facility_name: data.facility_name,
                phone_number: data.phone_number,
                address: data.address,
                role: data.role
            });
            resolve({
                errCode: 0,
                message: 'OK'
            });

        } catch (e) {
            resolve({
                errCode: 1,
                message: 'Cannot create facility'
            });
            reject(e);
        }
    })
}

let updateFacility = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Facility.update(
                {
                    facility_name: data.facility_name,
                    phone_number: data.phone_number,
                    address: data.address
                },
                {
                    where: { facility_id: data.facility_id }
                }
            )
            resolve(true)
        } catch (e) {
            resolve(false)
            reject(e)
        }
    });
}

let getFacilitiesByRole = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            let facilities = await db.Facility.findAll({
                where: {
                    role: query.role
                },
                raw: true
            });

            resolve({
                errCode: 0,
                message: 'OK',
                facilities: facilities
            });
        } catch (e) {
            reject(e);
        }
    });
}

let getFacilityInfoByID = (facility_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let facility = await db.Facility.findOne({
                where: { facility_id: facility_id },
                raw: true
            });

            if (facility) {
                resolve({
                    errCode: 0,
                    message: 'OK',
                    facility: facility
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'Facility not found',
                });
            }

        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    facilityLogin: facilityLogin,
    createNewFacility: createNewFacility,
    updateFacility: updateFacility,
    getFacilitiesByRole: getFacilitiesByRole,
    getFacilityInfoByID: getFacilityInfoByID,
}