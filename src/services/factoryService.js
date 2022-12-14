const { sequelize } = require('../models/index');
const db = require('../models/index');
const { getFacilityInfoByID } = require('./facilityService');
const { relocateProduct } = require('./productService')

// factory_id, year
let getDefectiveOverProduceStatistics = (data) => {
    return new Promise(async (resolve, reject) => {
        let factory = await getFacilityInfoByID(data.factory_id)

        if (factory.errCode !== 0) {
            resolve({
                errCode: 1,
                message: 'Không tìm thấy nhà máy'
            })
        } else {
            try {
                let statistics = await sequelize.query(
                    'SELECT a.product_line, a.quantity_defective, b.total ' +
                    'FROM ' +
                    '(SELECT product_lines.product_line, ' +
                    'SUM(IF(products.product_id IS NOT NULL AND warranty_cards.customer_id IS NOT NULL AND YEAR(manufacture_date) = :year AND manufacture_at = :factory_id, 1, 0)) AS quantity_defective ' +
                    'FROM products JOIN warranty_cards ON products.product_id = warranty_cards.product_id ' +
                    'RIGHT JOIN product_lines ON products.product_line = product_lines.product_line ' +
                    'GROUP BY product_line ' +
                    'ORDER BY product_line) AS a ' +
                    'JOIN ' +
                    '(SELECT product_lines.product_line AS product_line, ' +
                    'SUM(IF(products.product_id IS NOT NULL AND YEAR(manufacture_date) = :year AND manufacture_at = :factory_id, 1, 0)) AS total ' +
                    'FROM products RIGHT JOIN product_lines ON products.product_line = product_lines.product_line ' +
                    'GROUP BY product_line ' +
                    'ORDER BY product_line) AS b ' +
                    'ON a.product_line = b.product_line ',
                    {
                        replacements: {
                            factory_id: data.factory_id,
                            year: data.year,
                            type: sequelize.QueryTypes.SELECT
                        },
                        raw: true
                    }
                )

                resolve({
                    errCode: 0,
                    message: 'OK',
                    statistics: statistics[0]
                })
            } catch (e) {
                console.log(e)
                resolve({
                    errCode: 3,
                    message: 'Có lỗi xảy ra'
                })
            }
        }
    })
}

// factory_id, year
let getSalesOverProduceStatistics = (data) => {
    return new Promise(async (resolve, reject) => {
        let factory = await getFacilityInfoByID(data.factory_id)

        if (factory.errCode !== 0) {
            resolve({
                errCode: 1,
                message: 'Không tìm thấy nhà máy'
            })
        } else {
            try {
                let statistics = await sequelize.query(
                    'SELECT a.product_line, a.quantity_sold, b.total ' +
                    'FROM ' +
                    '(SELECT product_lines.product_line, ' +
                    'SUM(IF(bills.bill_id IS NOT NULL AND YEAR(bills.buy_date) = :year AND products.manufacture_at = :factory_id, 1, 0)) AS quantity_sold ' +
                    'FROM products JOIN bills ON products.product_id = bills.product_id ' +
                    'RIGHT JOIN product_lines ON products.product_line = product_lines.product_line ' +
                    'GROUP BY product_lines.product_line ' +
                    'ORDER BY product_lines.product_line) AS a ' +
                    'JOIN ' +
                    '(SELECT product_lines.product_line AS product_line, ' +
                    'SUM(IF(products.product_id IS NOT NULL AND YEAR(manufacture_date) = :year AND manufacture_at = :factory_id, 1, 0)) AS total ' +
                    'FROM products RIGHT JOIN product_lines ON products.product_line = product_lines.product_line ' +
                    'GROUP BY product_line ' +
                    'ORDER BY product_line) AS b ' +
                    'ON a.product_line = b.product_line ',
                    {
                        replacements: {
                            factory_id: data.factory_id,
                            year: data.year,
                            type: sequelize.QueryTypes.SELECT
                        },
                        raw: true
                    }
                )

                resolve({
                    errCode: 0,
                    message: 'OK',
                    statistics: statistics[0]
                })
            } catch (e) {
                resolve({
                    errCode: 3,
                    message: 'Có lỗi xảy ra'
                })
            }
        }
    })
}

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
                message: 'Không tìm thấy nhà máy'
            })
        } else if (agent.errCode !== 0 || agent.facility.role !== "agent") {
            resolve({
                errCode: 1,
                message: 'Không tìm thấy đại lý'
            })
        } else if (products[0].length === 0 || products[0].length < data.quantity) {
            resolve({
                errCode: 2,
                message: 'Không đủ sản phẩm để vận chuyển'
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
                        message: 'Có lỗi xảy ra'
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
                message: 'Không tìm thấy nhà máy'
            })
        } else {
            let products = await db.Products_Track.findAll({
                where: {
                    current_at: data.factory_id,
                    status: ["Need to be recycled"]
                },
                raw: true
            })
            if (products.length === 0) {
                resolve({
                    errCode: 3,
                    message: 'Không có sản phẩm cần tái chế'
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
                                status: ["Need to be recycled"]
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
                        message: 'Có lỗi xảy ra'
                    })
                }
            }
        }
    })
}

let repairProducts = (data) => {
    return new Promise(async (resolve, reject) => {
        let factory = await getFacilityInfoByID(data.factory_id)

        if (factory.errCode !== 0 || factory.facility.role !== 'factory') {
            resolve({
                errCode: 1,
                message: 'Không tìm thấy nhà máy'
            })
        } else {
            try {
                let products = await db.Products_Track.findAll({
                    where: {
                        current_at: data.factory_id,
                        status: "Defective"
                    },
                    raw: true
                })

                if (!products || products.length === 0) {
                    resolve({
                        errCode: 3,
                        message: 'Không có sản phẩm nào cần sửa chữa'
                    })
                } else {
                    for (let i = 0; i < products.length; i++) {
                        let prob = Math.random() <= 0.6;
                        if (prob) {
                            await db.Products_Track.update(
                                {
                                    status: "Ready to deliver"
                                },
                                {
                                    where: {
                                        product_id: products[i].product_id
                                    }
                                }
                            )
                        } else {
                            await db.Products_Track.update(
                                {
                                    status: "Need to be recycled"
                                },
                                {
                                    where: {
                                        product_id: products[i].product_id
                                    }
                                }
                            )
                        }
                    }

                    resolve({
                        errCode: 0,
                        message: 'OK'
                    })
                }
            } catch (e) {
                resolve({
                    errCode: 2,
                    message: 'Có lỗi xảy ra'
                })
            }
        }
    })
}

// factory_id, product_line
let reportDefectiveProductLine = (data) => {
    return new Promise(async (resolve, reject) => {
        let factory = await getFacilityInfoByID(data.factory_id)

        if (factory.errCode !== 0 || factory.facility.role !== 'factory') {
            resolve({
                errCode: 1,
                message: 'Không tìm thấy nhà máy'
            })
        } else {
            /**
         * products = {result, metadata}
         * so products we need is products[0]
         */
            try {
                let products = await sequelize.query(
                    'SELECT products_track.* ' +
                    'FROM products_track JOIN products ON products_track.product_id = products.product_id ' +
                    'WHERE product_line = :product_line AND products.manufacture_at = :manufacture_at AND status != :status',
                    {
                        replacements: {
                            product_line: data.product_line,
                            manufacture_at: data.factory_id,
                            status: 'Repair done',
                            type: sequelize.QueryTypes.SELECT
                        },
                        raw: true
                    }
                )

                if (products[0].length === 0) {
                    resolve({
                        errCode: 2,
                        message: 'Nhà máy này chưa sản xuất sản phẩm nào thuộc dòng sản phẩm trên'
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
                            message: 'Có lỗi xảy ra'
                        })
                    }
    
                    resolve({
                        errCode: 0,
                        message: 'OK'
                    })
                }
            } catch (e) {
                console.log(e)
            }
        }
    })
}

module.exports = {
    deliverProducts: deliverProducts,
    recycleProducts: recycleProducts,
    repairProducts: repairProducts,
    reportDefectiveProductLine: reportDefectiveProductLine,
    getSalesOverProduceStatistics: getSalesOverProduceStatistics,
    getDefectiveOverProduceStatistics: getDefectiveOverProduceStatistics
}