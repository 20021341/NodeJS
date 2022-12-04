const db = require('../models/index')
const { getFacilityInfoByID } = require('./facilityService')
const { relocateProduct } = require('./productService')

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
                        message: 'No products need action'
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
                                message: "Cannot find this product\'s warranty card"
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

//agent_id, center_id
let deliverDefectiveProducts = (data) => {
    return new Promise(async (resolve, reject) => {
        let agent = await getFacilityInfoByID(data.agent_id)
        let center = await getFacilityInfoByID(data.center_id)

        if (agent.errCode !== 0 || agent.facility.role !== "agent") {
            resolve({
                errCode: 2,
                message: 'Agent not found'
            })
        } else if (center.errCode !== 0 || center.facility.role !== "center") {
            resolve({
                errCode: 2,
                message: 'Center not found'
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
                    message: 'No product is defective'
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

                        resolve({
                            errCode: 0,
                            message: 'OK'
                        })
                    } else {
                        resolve({
                            errCode: 3,
                            message: 'Cannot deliver'
                        })
                    }
                }
            }
        }
    })
}

module.exports = {
    deliverCustomersProducts: deliverCustomersProducts,
    deliverDefectiveProducts: deliverDefectiveProducts
}