const db = require('../models/index');

let facilityLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let check = await findUsername(username);

            if (check) {
                let facility = await db.Facility.findOne({
                    where: { username: username },
                    raw: true
                });

                if (password.localeCompare(facility.password) == 0) {
                    data.errCode = 0;
                    data.message = 'OK';
                    delete facility.password;
                    data.facility = facility;
                } else {
                    data.errCode = 3;
                    data.message = 'Wrong password';
                }
            } else {
                data.errCode = 1;
                data.message = 'User not found!';
            }

            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
}

let findUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let facility = await db.Facility.findOne({
                where: { username: username }
            });

            if (facility) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
}

let createNewFacility = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await findUsername(data.username);

            if (check) {
                // username da ton tai
                resolve(false);
            } else {
                // username chua ton tai
                // tao user moi
                await db.Facility.create({
                    name: data.name,
                    username: data.username,
                    password: data.password,
                    address: data.address,
                    role: data.role
                });
                resolve(true);
            }

        } catch (e) {
            reject(e);
        }
    })
}

let updateFacility = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Facility.update(
                {
                    name: data.name,
                    address: data.address
                },
                {
                    where: { facility_id: data.id }
                }
            )
            resolve(true)
        } catch (e) {
            resolve(false)
            reject(e)
        }
    });
}

let getAllFacilities = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let facilities = await db.Facility.findAll({
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
                    message: 'User not found',
                    facility: {}
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
    getAllFacilities: getAllFacilities,
    getFacilityInfoByID: getFacilityInfoByID,
}