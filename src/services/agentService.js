const db = require('../models/index')
const Op = require('sequelize')
const { getFacilityInfoByID } = require('./facilityService')
const { relocateProduct } = require('./productService')

// agent_id
let deliverProductFromAgent = (data) => {
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
                        status: ["Ready to maintain", "Defective"]
                    },
                    raw: true
                })

                if (products.length === 0) {
                    resolve({
                        errCode: 1,
                        message: 'No products need action'
                    })
                } else {
                    for (let i = 0; i < products.length; i++) {
                        if (products[i].status === "Ready to maintain") {
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
                                    message: "Cannot find this product\'s warranty card"
                                })
                            } else {
                                let check = await relocateProduct({
                                    product_id: products[i].product_id,
                                    src_id: data.agent_id,
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
                                        message: "Cannot deliver"
                                    })
                                }
                            }
                        } else {
                            let product = await db.Product.findOne({
                                where: {
                                    product_id: products[i].product_id,
                                },
                                raw: true
                            })

                            let check = await relocateProduct({
                                product_id: products[i].product_id,
                                src_id: data.agent_id,
                                des_id: product.manufacture_at
                            })

                            if (check.errCode !== 0) {
                                resolve({
                                    errCode: 2,
                                    message: "Cannot deliver"
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

module.exports = {
    deliverProductFromAgent: deliverProductFromAgent
}