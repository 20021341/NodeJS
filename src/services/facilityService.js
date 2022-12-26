const db = require('../models/index');

let createFacility = (data) => {
    return new Promise(async (resolve, reject) => {
        let facilityData = await getFacilityInfoByName(data.facility_name)
        if (facilityData.errCode === 0) {
            resolve({
                errCode: 1,
                message: 'Tên cơ sở đã được dùng'
            })
        } else {
            let new_facility_id = ""
            while (true) {
                new_facility_id = data.role + Math.floor(Math.random() * 1000).toString()
                facilityData = await getFacilityInfoByID(new_facility_id)
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
                    message: 'Có lỗi xảy ra'
                });
            }
        }
    })
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
                    message: 'Không tìm thấy cơ sở',
                });
            }

        } catch (e) {
            reject(e);
        }
    });
}

let getFacilityInfoByName = (facility_name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let facility = await db.Facility.findOne({
                where: { facility_name: facility_name },
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
                    message: 'Không tìm thấy cơ sở',
                });
            }

        } catch (e) {
            reject(e);
        }
    });
}

let getAllFacilities = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let facilities = await db.Facility.findAll({
                raw: true
            });

            for (let i = 0; i < facilities.length; i++) {
                switch (facilities[i].role) {
                    case 'admin':
                        facilities[i].role = 'Ban điều hành'
                        break
                    case 'factory':
                        facilities[i].role = 'Nhà máy sản xuất'
                        break
                    case 'agent':
                        facilities[i].role = 'Đại lý phân phối'
                        break
                    case 'center':
                        facilities[i].role = 'Trung tâm bảo hành'
                }
            }

            resolve({
                errCode: 0,
                message: 'OK',
                facilities: facilities
            })
        } catch (e) {
            resolve({
                errCode: 1,
                message: 'Có lỗi xảy ra',
            })
        }
    })
}

let getAllFacilitiesByRole = (role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let facilities = await db.Facility.findAll({
                where: {
                    role: role
                },
                raw: true
            });

            resolve({
                errCode: 0,
                message: 'OK',
                facilities: facilities
            })
        } catch (e) {
            resolve({
                errCode: 1,
                message: 'Có lỗi xảy ra',
            })
        }
    })
}

module.exports = {
    createFacility: createFacility,
    getFacilityInfoByID: getFacilityInfoByID,
    getAllFacilities: getAllFacilities,
    getAllFacilitiesByRole: getAllFacilitiesByRole
}