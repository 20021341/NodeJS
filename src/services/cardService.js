const { sequelize } = require('../models/index');
const db = require('../models/index');

// product_id, agent_id, center_id, customer_id
let createCard = (data) => {
    return new Promise(async (resolve, reject) => {
        /**
         * product = {result, metadata}
         * so product we need is product[0]
         */
        let product = await sequelize.query(
            'SELECT products_track.*, product_lines.warranty_period FROM products JOIN product_lines ON products.product_line = product_lines.product_line JOIN products_track ON products.product_id = products_track.product_id WHERE products_track.product_id = :product_id AND products_track.current_at IS NULL',
            {
                replacements: {
                    product_id: data.product_id,
                    type: sequelize.QueryTypes.SELECT
                },
                raw: true
            }
        )

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

        // expect 1
        if (product[0].length === 0) {
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
            let now = new Date()
            let buy_date = Date.parse(bill.buy_date)
            let diff = Math.abs(buy_date - now)
            diff = Math.floor(diff / 2629746000)

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
            } else if (diff > product[0][0].warranty_period) {
                resolve({
                    errCode: 5,
                    message: 'Your product is expired'
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
                            status: "Waiting to deliver"
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

// agent_id
let getCardsByAgentID = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cards = await db.Warranty_Card.findAll({
                where: {
                    create_at: data.agent_id
                },
                raw: true
            })

            for (let i = 0; i < cards.length; i++) {
                let center = await db.Facility.findOne({
                    where: {
                        facility_id: cards[i].maintain_at
                    },
                    raw: true
                })

                cards[i].maintain_at = center.facility_name
            }

            resolve({
                errCode: 0,
                message: 'OK',
                cards: cards
            })
        } catch {
            resolve({
                errCode: 1,
                message: 'Some mysql error'
            })
        }
    })
}

module.exports = {
    createCard: createCard,
    getCardsByAgentID: getCardsByAgentID
}