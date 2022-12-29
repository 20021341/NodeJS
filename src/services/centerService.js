const db = require('../models/index')
const { sequelize } = require('../models/index');
const { getFacilityInfoByID } = require('./facilityService')
const { relocateProduct } = require('./productService')

// center_id, year, product_line
let getWarrantyStatisticsByProductLine = (data) => {
    return new Promise(async (resolve, reject) => {
        let center = await getFacilityInfoByID(data.center_id)
        let product_line = await db.Product_Line.findOne({
            where: {
                product_line: data.product_line
            },
            raw: true
        })

        if (center.errCode !== 0) {
            resolve({
                errCode: 1,
                message: 'Không tìm thấy trung tâm'
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
                    'SUM(IF(warranty_cards.card_id IS NOT NULL AND warranty_cards.maintain_at = :center_id AND YEAR(warranty_cards.create_date) = :year AND products.product_line = :product_line, 1, 0)) AS quantity ' +
                    'FROM warranty_cards JOIN products ON warranty_cards.product_id = products.product_id ' +
                    'RIGHT JOIN months ON MONTH(warranty_cards.create_date) = months.month ' +
                    'GROUP BY months.month ' +
                    'ORDER BY month',
                    {
                        replacements: {
                            product_line: data.product_line,
                            center_id: data.center_id,
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

// center_id
let repairProducts = (data) => {
    return new Promise(async (resolve, reject) => {
        let center = await getFacilityInfoByID(data.center_id)

        if (center.errCode !== 0 || center.facility.role !== "center") {
            resolve({
                errCode: 1,
                message: 'Không tìm thấy trung tâm bảo hành'
            })
        } else {
            let products = await db.Products_Track.findAll({
                where: {
                    current_at: data.center_id,
                    status: "Repairing"
                },
                raw: true
            })

            if (!products || products.length === 0) {
                resolve({
                    errCode: 2,
                    message: "Không có sản phẩm nào cần sửa chữa"
                })
            } else {
                for (let i = 0; i < products.length; i++) {
                    let card = await db.Warranty_Card.findOne({
                        where: {
                            product_id: products[i].product_id,
                        },
                        raw: true
                    })

                    if (!card) {
                        resolve({
                            errCode: 4,
                            message: "Không tìm thấy phiếu bảo hành của sản phẩm " + products[i].product_id
                        })
                    } else {
                        let prob = Math.random() <= 0.6;

                        if (prob) {
                            // move product to agent
                            let check = await relocateProduct({
                                product_id: products[i].product_id,
                                des_id: card.create_at
                            })

                            // move success
                            if (check.errCode === 0) {
                                if (card.customer_id !== null) {
                                    // update card if product has owner
                                    await db.Warranty_Card.update(
                                        {
                                            status: "Done"
                                        },
                                        {
                                            where: { card_id: card.card_id }
                                        }
                                    )
                                } else {
                                    // destry card if product is ownerless
                                    await db.Warranty_Card.destroy({
                                        where: { card_id: card.card_id }
                                    })

                                    // products those are ownerless 
                                    await db.Products_Track.update(
                                        {
                                            status: "Ready to sell"
                                        },
                                        {
                                            where: { product_id: products[i].product_id }
                                        }
                                    )
                                }
                            } else {
                                resolve({
                                    errCode: 5,
                                    message: "Có lỗi xảy ra"
                                })
                            }
                        } else {
                            // cannot repair

                            try {
                                await db.Products_Track.update(
                                    {
                                        status: "Broken, cannot repair"
                                    },
                                    {
                                        where: {
                                            product_id: products[i].product_id
                                        }
                                    }
                                )

                                // update card
                                if (card.customer_id !== null) {
                                    await db.Warranty_Card.update(
                                        {
                                            status: "Cannot repair"
                                        },
                                        {
                                            where: { card_id: card.card_id }
                                        }
                                    )
                                } else {
                                    await db.Warranty_Card.destroy(
                                        {
                                            where: { card_id: card.card_id }
                                        }
                                    )
                                }
                            } catch {
                                resolve({
                                    errCode: 5,
                                    message: 'Có lỗi xảy ra'
                                })
                            }
                        }
                    }
                }
            }

            resolve({
                errCode: 0,
                message: 'OK'
            })
        }
    })
}

let deliverBrokenProducts = async (data) => {
    return new Promise(async (resolve, reject) => {
        let products = await db.Products_Track.findAll({
            where: {
                current_at: data.center_id,
                status: "Broken, cannot repair"
            },
            raw: true
        })

        if (!products || products.length === 0) {
            resolve({
                errCode: 1,
                message: 'Không có sản phẩm nào bị hỏng'
            })
        } else {
            try {
                for (let i = 0; i < products.length; i++) {
                    // find which factory produced this product
                    let productInfo = await db.Product.findOne({
                        where: { product_id: products[i].product_id },
                        raw: true
                    })

                    // move it to that factory
                    await relocateProduct({
                        product_id: products[i].product_id,
                        des_id: productInfo.manufacture_at
                    })
                }

                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            } catch {
                resolve({
                    errCode: 2,
                    message: 'Có lỗi xảy ra'
                })
            }
        }
    })
}

module.exports = {
    repairProducts: repairProducts,
    deliverBrokenProducts: deliverBrokenProducts,
    getWarrantyStatisticsByProductLine: getWarrantyStatisticsByProductLine,
}