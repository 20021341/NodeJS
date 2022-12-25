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
                    message: 'Có lỗi xảy ra'
                })

                reject(e)
            }
        } else {
            resolve({
                errCode: 2,
                message: 'Khách hàng đã tồn tại'
            })
        }
    })
}

let getAllCustomers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let customers = await db.Customer.findAll({
                raw: true
            })

            resolve({
                errCode: 0,
                message: 'OK',
                customers: customers
            })
        } catch (e) {
            resolve({
                errCode: 1,
                message: 'Có lỗi xảy ra',
            })
        }
    })
}

let getCustomerByID = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let customer = await db.Customer.findOne({
                where: {
                    customer_id: data.customer_id
                },
                raw: true
            })

            if (!customer) {
                resolve({
                    errCode: 2,
                    message: 'Không tìm thấy khách hàng'
                })
            } else {
                resolve({
                    errCode: 0,
                    message: 'OK',
                    customer: customer
                })
            }
        } catch (e) {
            resolve({
                errCode: 1,
                message: 'Có lỗi xảy ra',
            })
        }
    })
}

module.exports = {
    createCustomer: createCustomer,
    getAllCustomers: getAllCustomers,
    getCustomerByID: getCustomerByID
}