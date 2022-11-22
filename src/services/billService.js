const db = require('../models/index');
const customerService = require('./customerService');

let createBill = (data) => {
    return new Promise(async (resolve, reject) => {
        let product = await db.Products_Track.findOne({
            where: { product_id: data.product_id },
            raw: true
        })

        let agent = await db.Facility.findOne({
            where: { facility_id: data.facility_id },
            raw: true
        })

        if (!product || product.status !== "Ready to sell") {
            resolve({
                errCode: 1,
                message: 'Product not found or product cannot be sold'
            })
        } else if (!agent || agent.role !== "agent") {
            resolve({
                errCode: 2,
                message: 'Agent not found'
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
                        product_id: data.product_id,
                        customer_id: data.customer_id,
                        buy_at: data.facility_id
                    })

                    await db.Products_Track.update(
                        {
                            current_at: null,
                            owner: data.customer_id,
                            status: "Sold"
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
                    console.log(e)
                    resolve({
                        errCode: 3,
                        message: 'Cannot create bill'
                    })
                    reject(e)
                }
            }
        }
    })
}

module.exports = {
    createBill: createBill
}