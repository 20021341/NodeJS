const { sequelize } = require('../models/index');
const db = require('../models/index');
const { getFacilityInfoByID } = require('./facilityService');
const { relocateProduct } = require('./productService')

// factory_id, agent_id, product_line, quantity
let deliverProducts = (data) => {
    return new Promise(async (resolve, reject) => {
        let factory = await getFacilityInfoByID(data.factory_id)
        let agent = await getFacilityInfoByID(data.agent_id)

        /**
         * products = {result, metadata}
         * so products we need is products[0]
         */
        let products = await sequelize.query(
            'SELECT products_track.* FROM products_track JOIN products ON products_track.product_id = products.product_id WHERE current_at = :current_at AND product_line = :product_line AND status = :status',
            {
                replacements: {
                    current_at: data.factory_id,
                    product_line: data.product_line,
                    status: "Ready to deliver",
                    type: sequelize.QueryTypes.SELECT
                },
                raw: true
            }
        )

        if (factory.errCode !== 0 || factory.facility.role !== "factory") {
            resolve({
                errCode: 1,
                message: 'Factory not found'
            })
        } else if (agent.errCode !== 0 || agent.facility.role !== "agent") {
            resolve({
                errCode: 1,
                message: 'Agent not found'
            })
        } else if (products[0].length === 0 || products[0].length < data.quantity) {
            resolve({
                errCode: 2,
                message: 'No product left or not enough to deliver'
            })
        } else {
            for (let i = 0; i < data.quantity; i++) {
                let check = await relocateProduct({
                    product_id: products[0][i].product_id,
                    des_id: data.agent_id
                })

                if (check.errCode !== 0) {
                    resolve({
                        errCode: 3,
                        message: 'Some mysql error'
                    })
                }
            }

            resolve({
                errCode: 0,
                message: 'OK'
            })
        }
    })
}

// factory_id
let recycleProducts = (data) => {
    return new Promise(async (resolve, reject) => {
        let factory = await getFacilityInfoByID(data.factory_id)

        if (factory.errCode !== 0 || factory.facility.role !== 'factory') {
            resolve({
                errCode: 1,
                message: 'Factory not found'
            })
        } else {
            try {
                await db.Products_Track.update(
                    {
                        status: "Recycled"
                    },
                    {
                        where: {
                            current_at: data.factory_id,
                            status: ["Need to be recycled", "Defective"]
                        }
                    }
                )

                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            } catch (e) {
                resolve({
                    errCode: 2,
                    message: 'Some mysql error'
                })
            }
        }
    })
}

// factory_id, product_line
let announceDefectiveProductLine = (data) => {
    return new Promise(async (resolve, reject) => {
        /**
         * products = {result, metadata}
         * so products we need is products[0]
         */
        let products = await sequelize.query(
            'SELECT products_track.* FROM products_track JOIN products ON products_track.product_id = products.product_id WHERE product_line = :product_line',
            {
                replacements: {
                    product_line: data.product_line,
                    type: sequelize.QueryTypes.SELECT
                },
                raw: true
            }
        )

        if (products[0].length === 0) {
            resolve({
                errCode: 2,
                message: 'None of this product line has been produced'
            })
        } else {
            try {
                for (let i = 0; i < products[0].length; i++) {
                    if (products[0][i].status === "Ready to deliver"
                        || products[0][i].status === "Ready to sell"
                        || products[0][i].status === "Sold") {
                        await db.Products_Track.update(
                            {
                                status: "Defective"
                            },
                            {
                                where: { product_id: products[0][i].product_id }
                            }
                        )
                    }
                }
            } catch (e) {
                resolve({
                    errCode: 3,
                    message: 'Some mysql error'
                })
            }

            resolve({
                errCode: 0,
                message: 'OK'
            })
        }
    })
}

module.exports = {
    deliverProducts: deliverProducts,
    recycleProducts: recycleProducts,
    announceDefectiveProductLine: announceDefectiveProductLine
}