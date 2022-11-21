const db = require('../models/index');

let createProducts = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product;

            for (let i = 0; i < data.quantity; i++) {
                product = await db.Product.create({
                    product_line: data.product_line,
                    manufacture_at: data.facility_id
                })

                await db.Products_Track.create({
                    product_id: product.product_id,
                    prev_at: null,
                    current_at: product.manufacture_at,
                    status: "Ready to deliver"
                })
            }

            resolve(true)
        } catch (e) {
            resolve(false)
            console.log(e)
            reject(e)
        }
    })
}

module.exports = {
    createProducts: createProducts
}