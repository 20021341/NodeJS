const db = require('../models/index')
const { getFacilityInfoByID } = require('./facilityService')
const { relocateProduct } = require('./productService')

// center_id, product_id
let repairProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        let center = await getFacilityInfoByID(data.center_id)

        if (center.errCode !== 0 || center.facility.role !== "center") {
            resolve({
                errCode: 1,
                message: 'Center not found'
            })
        } else {
            let product = await db.Products_Track.findOne({
                where: {
                    product_id: data.product_id,
                    current_at: data.center_id
                },
                raw: true
            })

            if (!product) {
                resolve({
                    errCode: 2,
                    message: "Product not found in this center"
                })
            } else if (product.status !== "Repairing") {
                resolve({
                    errCode: 3,
                    message: "Product not need to repair"
                })
            } else {
                let card = await db.Warranty_Card.findOne({
                    where: {
                        product_id: data.product_id,
                        status: "Repairing"
                    },
                    raw: true
                })

                if (!card) {
                    resolve({
                        errCode: 4,
                        message: "Cannot find this product\'s warranty card"
                    })
                } else {
                    let prob = Math.random() <= 0.6;

                    if (prob) {
                        let check = await relocateProduct({
                            product_id: data.product_id,
                            des_id: card.create_at
                        })

                        if (check.errCode === 0) {
                            if (card.customer_id !== undefined) {
                                await db.Warranty_Card.update(
                                    {
                                        status: "Done"
                                    },
                                    {
                                        where: { card_id: card.card_id }
                                    }
                                )
                            } else {
                                await db.Warranty_Card.destroy({
                                    where: { card_id: card.card_id }
                                })
                            }

                            resolve({
                                errCode: 0,
                                message: 'Repair done, delivered to agent'
                            })
                        } else {
                            resolve({
                                errCode: 5,
                                message: "Some error in mysql"
                            })
                        }
                    } else {
                        let productInfo = await db.Product.findOne({
                            where: { product_id: data.product_id },
                            raw: true
                        })

                        let check = await relocateProduct({
                            product_id: data.product_id,
                            des_id: productInfo.manufacture_at
                        })

                        if (check.errCode === 0) {
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

                            resolve({
                                errCode: 0,
                                message: 'Cannot repair, delivered to factory'
                            })
                        } else {
                            resolve({
                                errCode: 5,
                                message: "Some error in mysql"
                            })
                        }
                    }
                }
            }
        }
    })
}

module.exports = {
    repairProduct: repairProduct
}