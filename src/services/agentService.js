const db = require('../models/index')
const { sequelize } = require('../models/index');
const { getFacilityInfoByID } = require('./facilityService')
const { relocateProduct } = require('./productService')

// agent_id, year, product_line
let getSalesStatisticsByProductLine = (data) => {
    return new Promise(async (resolve, reject) => {
        let agent = await getFacilityInfoByID(data.agent_id)
        let product_line = await db.Product_Line.findOne({
            where: {
                product_line: data.product_line
            },
            raw: true
        })

        if (agent.errCode !== 0) {
            resolve({
                errCode: 1,
                message: 'Không tìm thấy đại lý'
            })
        } else if (!product_line) {
            resolve({
                errCode: 2,
                message: 'Không tìm thấy dòng sản phẩm'
            })
        } else {
            try {
                let statistics = await sequelize.query(
                    'SELECT months.month AS month, ' +
                    'SUM(IF(bills.bill_id IS NOT NULL AND bills.buy_at = :agent_id AND YEAR(bills.buy_date) = :year AND products.product_line = :product_line, 1, 0)) AS quantity_sold ' +
                    'FROM bills JOIN products ON bills.product_id = products.product_id ' +
                    'RIGHT JOIN months ON MONTH(bills.buy_date) = months.month ' +
                    'GROUP BY months.month ' +
                    'ORDER BY month',
                    {
                        replacements: {
                            product_line: data.product_line,
                            agent_id: data.agent_id,
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

// agent_id
let deliverCustomersProducts = (data) => {
    return new Promise(async (resolve, reject) => {
        let agent = await getFacilityInfoByID(data.agent_id)

        if (agent.errCode !== 0 || agent.facility.role !== "agent") {
            resolve({
                errCode: 2,
                message: 'Agent not found'
            })
        } else {
            try {
                let products = await db.Products_Track.findAll({
                    where: {
                        current_at: data.agent_id,
                        status: "Waiting to deliver"
                    },
                    raw: true
                })

                if (products.length === 0) {
                    resolve({
                        errCode: 1,
                        message: 'Không có sản phẩm nào bị lỗi'
                    })
                } else {
                    for (let i = 0; i < products.length; i++) {
                        let card = await db.Warranty_Card.findOne({
                            where: {
                                product_id: products[i].product_id,
                                status: "Waiting to deliver"
                            },
                            raw: true
                        })

                        if (!card) {
                            resolve({
                                errCode: 2,
                                message: "Không tìm thấy phiếu bảo hành của sản phẩm"
                            })
                        } else {
                            let check = await relocateProduct({
                                product_id: products[i].product_id,
                                des_id: card.maintain_at
                            })

                            if (check.errCode === 0) {
                                await db.Warranty_Card.update(
                                    {
                                        status: "Repairing"
                                    },
                                    {
                                        where: { card_id: card.card_id }
                                    }
                                )
                            } else {
                                resolve({
                                    errCode: 2,
                                    message: "Có lỗi xảy ra"
                                })
                            }
                        }
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

//agent_id, center_id
let deliverDefectiveProducts = (data) => {
    return new Promise(async (resolve, reject) => {
        let agent = await getFacilityInfoByID(data.agent_id)
        let center = await getFacilityInfoByID(data.center_id)

        if (agent.errCode !== 0 || agent.facility.role !== "agent") {
            resolve({
                errCode: 2,
                message: 'Không tìm thấy đại lý'
            })
        } else if (center.errCode !== 0 || center.facility.role !== "center") {
            resolve({
                errCode: 2,
                message: 'Không tìm thấy trung tâm bảo hành'
            })
        } else {
            let products = await db.Products_Track.findAll({
                where: {
                    current_at: data.agent_id,
                    status: "Defective"
                },
                raw: true
            })

            if (products.length === 0) {
                resolve({
                    errCode: 1,
                    message: 'Không có sản phẩm nào bị lỗi'
                })
            } else {
                for (let i = 0; i < products.length; i++) {
                    let new_card_id

                    while (true) {
                        new_card_id = Math.floor(Math.random() * 10000)
                        let card = await db.Warranty_Card.findOne({
                            where: { card_id: new_card_id },
                            raw: true
                        })

                        if (!card) {
                            break
                        }
                    }

                    let check = await relocateProduct({
                        product_id: products[i].product_id,
                        des_id: data.center_id
                    })

                    if (check) {
                        await db.Warranty_Card.create({
                            card_id: new_card_id,
                            product_id: products[i].product_id,
                            create_at: data.agent_id,
                            maintain_at: data.center_id,
                            status: "Repairing"
                        })
                    } else {
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
        }
    })
}

let getProductsNeedRetrieving = (data) => {
    return new Promise(async (resolve, reject) => {
        let agent = await getFacilityInfoByID(data.agent_id)

        if (agent.errCode !== 0 || agent.facility.role !== "agent") {
            resolve({
                errCode: 2,
                message: 'Không tìm thấy đại lý'
            })
        } else {
            try {
                let products = await sequelize.query(
                    'SELECT products_track.product_id, customers.*, products_track.status ' +
                    'FROM bills JOIN products_track ON bills.product_id = products_track.product_id ' +
                    'JOIN customers ON bills.customer_id = customers.customer_id ' +
                    'WHERE products_track.current_at IS NULL AND status = :status AND bills.buy_at = :buy_at',
                    {
                        replacements: {
                            status: "Defective",
                            buy_at: data.agent_id,
                            type: sequelize.QueryTypes.SELECT
                        },
                        raw: true
                    }
                )

                if (!products[0] || products[0].length === 0) {
                    resolve({
                        errCode: 1,
                        message: 'Không có sản phẩm nào cần thu hồi'
                    })
                } else {
                    for (let i = 0; i < products[0].length; i++) {
                        products[0][i].status = "Sản phẩm bị lỗi, cần liên hệ khách hàng để thu hồi"
                    }

                    resolve({
                        errCode: 0,
                        message: 'OK',
                        products: products[0]
                    })
                }
            } catch {
                resolve({
                    errCode: 3,
                    message: 'Có lỗi xảy ra'
                })
            }
        }
    })
}

module.exports = {
    deliverCustomersProducts: deliverCustomersProducts,
    getSalesStatisticsByProductLine: getSalesStatisticsByProductLine,
    deliverDefectiveProducts: deliverDefectiveProducts,
    getProductsNeedRetrieving: getProductsNeedRetrieving
}