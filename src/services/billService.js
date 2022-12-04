const db = require('../models/index');
const { sequelize } = require('../models/index');
const customerService = require('./customerService');

// product_line, quantity, agent_id, customer_id, fullname, phone_number
let createBill = (data) => {
    return new Promise(async (resolve, reject) => {
        /**
         * products = {result, metadata}
         * so products we need is products[0]
         */
        let products = await sequelize.query(
            'SELECT products_track.* FROM products_track JOIN products ON products_track.product_id = products.product_id WHERE current_at = :current_at AND product_line = :product_line AND status = :status',
            {
                replacements: {
                    current_at: data.agent_id,
                    product_line: data.product_line,
                    status: "Ready to sell",
                    type: sequelize.QueryTypes.SELECT
                },
                raw: true
            }
        )

        let agent = await db.Facility.findOne({
            where: { facility_id: data.agent_id },
            raw: true
        })

        if (!agent || agent.role !== "agent") {
            resolve({
                errCode: 1,
                message: 'Agent not found'
            })
        } else if (products[0].length < data.quantity) {
            resolve({
                errCode: 2,
                message: "Insufficient product"
            })
        } else {
            let customer = await db.Customer.findOne({
                where: { customer_id: data.customer_id },
                raw: true
            })

            if (!customer) {
                await customerService.createCustomer({
                    customer_id: data.customer_id,
                    fullname: data.fullname,
                    phone_number: data.phone_number
                })
            }

            if (customer !== null && (customer.fullname !== data.fullname
                || customer.phone_number !== data.phone_number)) {

                resolve({
                    errCode: 4,
                    message: 'Customer info not match'
                })
            } else {
                for (let i = 0; i < data.quantity; i++) {
                    let new_bill_id

                    while (true) {
                        new_bill_id = Math.floor(Math.random() * 10000)
                        let bill = await db.Bill.findOne({
                            where: { bill_id: new_bill_id },
                            raw: true
                        })

                        if (!bill) {
                            break
                        }
                    }

                    try {
                        await db.Bill.create({
                            bill_id: new_bill_id,
                            product_id: products[0][i].product_id,
                            customer_id: data.customer_id,
                            buy_at: data.agent_id
                        })

                        await db.Products_Track.update(
                            {
                                current_at: null,
                                owner: data.customer_id,
                                status: "Sold"
                            },
                            {
                                where: { product_id: products[0][i].product_id }
                            }
                        )
                    } catch (e) {
                        console.log(e)
                        resolve({
                            errCode: 3,
                            message: 'Cannot create bill'
                        })
                        reject(e)
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

// agent_id
let getBillsByAgentID = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bills = await db.Bill.findAll({
                where: {
                    buy_at: data.agent_id
                },
                raw: true
            })

            resolve({
                errCode: 0,
                message: 'OK',
                bills: bills
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
    createBill: createBill,
    getBillsByAgentID: getBillsByAgentID
}