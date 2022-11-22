const db = require('../models/index');

let createCustomer = (data) => {
    return new Promise(async (resolve, reject) => {
        let customer = await db.Customer.findOne({
            where: { customer_id: data.customer_id },
            raw: true
        })

        if (!customer) {
            try {
                await db.Customer.create({
                    customer_id: data.customer_id,
                    fullname: data.fullname,
                    phone_number: data.phone_number
                })

                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            } catch (e) {
                resolve({
                    errCode: 1,
                    message: 'Cannot create customer'
                })

                reject(e)
            }
        } else {
            resolve({
                errCode: 2,
                message: 'Customer already exists'
            })
        }
    })
}

module.exports = {
    createCustomer: createCustomer
}