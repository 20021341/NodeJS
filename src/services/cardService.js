const db = require('../models/index');

// product_id, agent_id, center_id, customer_id
let createCard = (data) => {
    return new Promise(async (resolve, reject) => {
        let product_track = await db.Products_Track.findOne({
            where: { product_id: data.product_id },
            raw: true
        })

        let agent = await db.Facility.findOne({
            where: { facility_id: data.agent_id },
            raw: true
        })

        let center = await db.Facility.findOne({
            where: { facility_id: data.center_id },
            raw: true
        })

        let customer = await db.Customer.findOne({
            where: { customer_id: data.customer_id },
            raw: true
        })

        let bill = await db.Bill.findOne({
            where: { product_id: data.product_id },
            raw: true
        })

        if (!product_track || product_track.status !== "Sold") {
            resolve({
                errCode: 1,
                message: 'Product not found or product has not been sold yet'
            })
        } else if (!agent || agent.role !== "agent") {
            resolve({
                errCode: 3,
                message: 'Agent not found'
            })
        } else if (!center || center.role !== "center") {
            resolve({
                errCode: 2,
                message: 'Center not found'
            })
        } else if (!customer) {
            resolve({
                errCode: 3,
                message: 'Customer not found'
            })
        } else if (!bill) {
            resolve({
                errCode: 4,
                message: 'Bill not found'
            })
        } else {
            if (bill.customer_id !== data.customer_id) {
                resolve({
                    errCode: 3,
                    message: 'Customer id not match'
                })
            } else if (bill.buy_at !== agent.facility_id) {
                resolve({
                    errCode: 4,
                    message: 'Please bring ur product to where u bought it'
                })
            } else {
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

                try {
                    await db.Warranty_Card.create({
                        card_id: new_card_id,
                        product_id: data.product_id,
                        create_at: data.agent_id,
                        maintain_at: data.center_id,
                        customer_id: data.customer_id,
                        status: "Waiting to deliver"
                    })

                    await db.Products_Track.update(
                        {
                            current_at: data.agent_id,
                            status: "Ready to maintain"
                        },
                        {
                            where: { product_id: data.product_id }
                        }
                    )

                    resolve({
                        errCode: 0,
                        message: 'OK'
                    })
                } catch (e) {
                    resolve({
                        errCode: 3,
                        message: 'Cannot create card'
                    })
                    reject(e)
                }
            }
        }
    })
}

module.exports = {
    createCard: createCard
}