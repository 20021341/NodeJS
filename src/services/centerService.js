const db = require('../models/index')
const { getFacilityInfoByID } = require('./facilityService')
const { relocateProduct } = require('./productService')

// center_id
let repairProducts = (data) => {
    return new Promise(async (resolve, reject) => {
        let center = await getFacilityInfoByID(data.center_id)

        if (center.errCode !== 0 || center.facility.role !== "center") {
            resolve({
                errCode: 1,
                message: 'Center not found'
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
                    message: "No products to repair"
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
                            message: "Cannot find " + products[i].product_id + " warranty card"
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
                                    message: "Some error in mysql"
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
                                    message: 'Some mysql errors'
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
                message: 'No product is broken'
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
                    message: 'Some mysql errors'
                })
            }
        }
    })
}

module.exports = {
    repairProducts: repairProducts,
    deliverBrokenProducts: deliverBrokenProducts
}