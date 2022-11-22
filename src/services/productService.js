const db = require('../models/index');
const { getFacilityInfoByID } = require('./facilityService');

let createProducts = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product;

            for (let i = 0; i < data.quantity; i++) {
                product = await db.Product.create({
                    product_line: data.product_line,
                    manufacture_at: data.facility_id
                })

                await db.Products_Track.create({
                    product_id: product.product_id,
                    current_at: product.manufacture_at,
                    status: "Ready to deliver"
                })
            }

            resolve({
                errCode: 0,
                message: "OK"
            })
        } catch (e) {
            resolve({
                errCode: 1,
                message: "Cannot create products"
            })
            console.log(e)
            reject(e)
        }
    })
}

let relocateProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        let src = getFacilityInfoByID(data.src_id)
        let des = getFacilityInfoByID(data.des_id)
        let newStatus

        if (src.errCode !== 0) {
            resolve({
                errCode: 0,
                message: "Source facility not found"
            })
        }

        if (des.errCode !== 0) {
            resolve({
                errCode: 0,
                message: "Source facility not found"
            })
        }

        if (src.facility.role === "factory" && des.facility.role === "agent") {
            newStatus = "Ready to sell"
        }

        if ((src.facility.role === "agent" || src.facility.role === "mt-center") && des.facility.role === "factory") {
            newStatus = "Need to be recycled"
        }

        if (src.facility.role === "agent" && des.facility.role === "mt-center") {
            newStatus = "Need to be repaired"
        }

        if (src.facility.role === "mt-center" && des.facility.role === "agent") {
            newStatus = "Repair done"
        }

        try {
            await db.Products_Track.update(
                {
                    current_at: data.des_id,
                    status: newStatus
                },
                {
                    where: { product_id: data.product_id }
                }
            )

            resolve({
                errCode: 0,
                message: "OK"
            })
        } catch (e) {
            resolve({
                errCode: 1,
                message: "Cannot relocate"
            })
            reject(e)
        }
    })
}

module.exports = {
    createProducts: createProducts
}