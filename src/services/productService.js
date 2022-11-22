const db = require('../models/index');
const { getFacilityInfoByID } = require('./facilityService');

let createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        let facilityData = await getFacilityInfoByID(data.facility_id)
        if (facilityData.errCode === 0) {
            if (facilityData.facility.role === "factory") {
                /**
                 * Begin create products
                 */
                try {
                    for (let i = 0; i < data.quantity; i++) {
                        let new_product_id
                        let product

                        while (true) {
                            new_product_id = data.product_line + Math.floor(Math.random() * 1000).toString()
                            let productData = await db.Product.findOne({
                                where: { product_id: new_product_id },
                                raw: true
                            })

                            if (!productData) {
                                break
                            }
                        }

                        product = await db.Product.create({
                            product_id: new_product_id,
                            product_line: data.product_line,
                            manufacture_at: data.facility_id
                        })

                        await db.Products_Track.create({
                            product_id: product.product_id,
                            current_at: product.manufacture_at,
                            status: "Ready to deliver"
                        })

                        resolve({
                            errCode: 0,
                            message: 'OK'
                        })
                    }
                } catch (e) {
                    resolve({
                        errCode: 3,
                        message: "Something wrong"
                    })
                    console.log(e)
                }
                /**
                 * End create products
                 */
            } else {
                resolve({
                    errCode: 2,
                    message: "Facility is not factory"
                })
            }
        } else {
            resolve({
                errCode: 1,
                message: "Cannot find facility"
            })
        }
    })
}

let relocateProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        let product = await db.Products_Track.findOne({
            where: { product_id: data.product_id },
            raw: true
        })

        if (!product) {
            /**
             * cannot find product
             */
            resolve({
                errCode: 3,
                message: "Product not exists"
            })
        } else {
            /**
             * product found
             */
            let des = await getFacilityInfoByID(data.des_id)
            let src_id = product.current_at
            let src = await getFacilityInfoByID(src_id)

            let newStatus = ""

            if (des.errCode !== 0) {
                /**
                 * destination not found
                 */
                resolve({
                    errCode: 1,
                    message: "Destination facility not found"
                })
            } else {
                /**
                 * valid product and destination
                 */
                if (src.facility.role === "factory" && des.facility.role === "agent") {
                    newStatus = "Ready to sell"
                }

                if ((src.facility.role === "agent" || src.facility.role === "center") && des.facility.role === "factory") {
                    newStatus = "Need to be recycled"
                }

                if (src.facility.role === "agent" && des.facility.role === "center") {
                    newStatus = "Need to be repaired"
                }

                if (src.facility.role === "center" && des.facility.role === "agent") {
                    newStatus = "Repair done"
                }

                if (newStatus === "") {
                    /**
                     * Cannot deliver this way
                     */
                    resolve({
                        errCode: 2,
                        message: "Wrong direction"
                    })
                } else {
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
                        /**
                         * Some error, may be on mysql
                         */
                        resolve({
                            errCode: 3,
                            message: "Cannot relocate"
                        })
                        reject(e)
                    }
                }
            }
        }
    })
}


module.exports = {
    createProduct: createProduct,
    relocateProduct: relocateProduct
}