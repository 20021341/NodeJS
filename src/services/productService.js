const { sequelize } = require('../models/index');
const db = require('../models/index');
const { getFacilityInfoByID } = require('./facilityService');

let createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        let facilityData = await getFacilityInfoByID(data.factory_id)
        let product_line = await db.Product_Line.findOne({
            where: { product_line: data.product_line },
            raw: true
        })
        if (facilityData.errCode === 0) {
            if (facilityData.facility.role === "factory") {
                if (!product_line) {
                    resolve({
                        errCode: 3,
                        message: 'Không tìm thấy dòng sản phẩm'
                    })
                } else {
                    try {
                        for (let i = 0; i < data.quantity; i++) {
                            let new_product_id
                            let product

                            while (true) {
                                new_product_id = data.product_line + Math.floor(Math.random() * 1000).toString()
                                let productData = await db.Product.findOne({
                                    where: { product_id: new_product_id },
                                    raw: true
                                })

                                if (!productData) {
                                    break
                                }
                            }

                            product = await db.Product.create({
                                product_id: new_product_id,
                                product_line: data.product_line,
                                manufacture_at: data.factory_id
                            })

                            await db.Products_Track.create({
                                product_id: product.product_id,
                                current_at: product.manufacture_at,
                                status: "Ready to deliver"
                            })

                            resolve({
                                errCode: 0,
                                message: 'OK'
                            })
                        }
                    } catch (e) {
                        resolve({
                            errCode: 3,
                            message: "Có lỗi xảy ra"
                        })
                        console.log(e)
                    }
                }
            } else {
                resolve({
                    errCode: 2,
                    message: "Cơ sở này không phải nhà máy"
                })
            }
        } else {
            resolve({
                errCode: 1,
                message: "Có lỗi xảy ra"
            })
        }
    })
}

// product_id, des_id
let relocateProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        let product = await db.Products_Track.findOne({
            where: {
                product_id: data.product_id,
            },
            raw: true
        })

        if (!product) {
            /**
             * cannot find product
             */
            resolve({
                errCode: 3,
                message: "Không tìm thấy sản phẩm"
            })
        } else {
            /**
             * product found
             */
            let des = await getFacilityInfoByID(data.des_id)
            let src_id = product.current_at
            let src = await getFacilityInfoByID(src_id)

            let newStatus = ""

            if (des.errCode !== 0) {
                /**
                 * destination not found
                 */
                resolve({
                    errCode: 1,
                    message: "Không tìm thấy đích đến"
                })
            } else {
                /**
                 * valid product and destination
                 */
                if (src.facility.role === "factory" && des.facility.role === "agent") {
                    newStatus = "Ready to sell"
                }

                if (src.facility.role === "agent" && des.facility.role === "center") {
                    newStatus = "Repairing"
                }

                if (src.facility.role === "center" && des.facility.role === "agent") {
                    newStatus = "Repair done"
                }

                if (src.facility.role === "center" && des.facility.role === "factory") {
                    newStatus = "Need to be recycled"
                }

                if (newStatus === "") {
                    /**
                     * Cannot deliver this way
                     */
                    resolve({
                        errCode: 2,
                        message: "Vận chuyển không đúng cách"
                    })
                } else {
                    try {
                        await db.Products_Track.update(
                            {
                                current_at: data.des_id,
                                status: newStatus
                            },
                            {
                                where: { product_id: data.product_id }
                            }
                        )

                        resolve({
                            errCode: 0,
                            message: "OK"
                        })

                    } catch (e) {
                        /**
                         * Some error, may be on mysql
                         */
                        resolve({
                            errCode: 3,
                            message: "Có lỗi xảy ra"
                        })
                        reject(e)
                    }
                }
            }
        }
    })
}

// facility_id
let getGoodProducts = (data) => {
    return new Promise(async (resolve, reject) => {
        let facilityData = await getFacilityInfoByID(data.facility_id)

        if (facilityData.errCode !== 0) {
            resolve({
                errCode: 1,
                message: 'Không tìm thấy cơ sở'
            })
        } else if (facilityData.facility.role === "center") {
            resolve({
                errCode: 1,
                message: 'Chỉ có nhà máy và đại lý có sản phẩm tốt, trung tâm bảo hành thì không'
            })
        } else {
            let products = await sequelize.query(
                'SELECT product_lines.product_line, SUM(IF(status IN (:status1, :status2) AND current_at = :facility_id, 1, 0)) AS quantity ' +
                'FROM products JOIN products_track ON products.product_id = products_track.product_id ' +
                'RIGHT JOIN product_lines ON products.product_line = product_lines.product_line ' +
                'GROUP BY product_lines.product_line',
                {
                    replacements: {
                        facility_id: data.facility_id,
                        status1: "Ready to deliver",
                        status2: "Ready to sell",
                        type: sequelize.QueryTypes.SELECT
                    },
                    raw: true
                }
            )

            if (products[0].length === 0) {
                resolve({
                    errCode: 2,
                    message: 'Cơ sở này không có sản phẩm tốt nào'
                })
            } else {
                resolve({
                    errCode: 0,
                    message: 'OK',
                    products: products[0]
                })
            }
        }
    })
}

// facility_id
let getBadProducts = (data) => {
    return new Promise(async (resolve, reject) => {
        let facilityData = await getFacilityInfoByID(data.facility_id)

        if (facilityData.errCode !== 0) {
            resolve({
                errCode: 1,
                message: 'Không tìm thấy cơ sở'
            })
        } else {
            // get status of products that current at an agent
            if (facilityData.facility.role === 'agent') {
                let products = await db.Products_Track.findAll({
                    where: {
                        current_at: data.facility_id,
                        status: ['Defective', 'Waiting to deliver']
                    },
                    raw: true
                })

                if (products.length === 0) {
                    resolve({
                        errCode: 2,
                        message: 'Không có sản phẩm xấu nào'
                    })
                } else {
                    for (let i = 0; i < products.length; i++) {
                        if (products[i].status === 'Defective') {
                            products[i].status = 'Sản phẩm bị lỗi, cần chuyển đến trung tâm bảo hành để sủa chữa'
                        } else {
                            let card = await db.Warranty_Card.findOne({
                                where: {
                                    product_id: products[i].product_id
                                },
                                raw: true
                            })

                            let center = await db.Facility.findOne({
                                where: {
                                    facility_id: card.maintain_at
                                },
                                raw: true
                            })

                            products[i].status = 'Sản phẩm cần bảo hành, cần chuyển đến ' + center.facility_name
                        }
                    }

                    resolve({
                        errCode: 0,
                        message: 'OK',
                        products: products
                    })
                }
            } else {
                // status of products at other facilitities
                let products = await db.Products_Track.findAll({
                    where: {
                        current_at: data.facility_id,
                        status: ['Need to be recycled', 'Repairing', 'Defective', 'Broken, cannot repair']
                    },
                    raw: true
                })

                if (products.length === 0) {
                    resolve({
                        errCode: 2,
                        message: 'Không có sản phẩm xấu nào'
                    })
                } else {
                    for (let i = 0; i < products.length; i++) {
                        if (products[i].status === 'Defective' || products[i].status === 'Repairing') {
                            products[i].status = 'Sản phẩm bị lỗi, cần sửa chữa'
                        } else {
                            products[i].status = 'Sản phẩm bị hỏng, cần tái chế'
                        }
                    }

                    resolve({
                        errCode: 0,
                        message: 'OK',
                        products: products
                    })
                }
            }
        }
    })
}

let getProductsOfCustomer = (customer_id) => {
    return new Promise(async (resolve, reject) => {
        let customer = await db.Customer.findOne({
            where: {
                customer_id: customer_id
            },
            raw: true
        })

        if (!customer) {
            resolve({
                errCode: 1,
                message: 'Không tìm thấy khách hàng'
            })
        } else {
            try {
                let products = await db.Products_Track.findAll({
                    where: {
                        current_at: null,
                        owner: customer_id
                    },
                    raw: true
                })

                resolve({
                    errCode: 0,
                    message: 'OK',
                    products: products
                })
            } catch {
                resolve({
                    errCode: 2,
                    message: 'Có lỗi xảy ra',
                })
            }
        }
    })
}

let getAllProductLines = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let product_lines = await db.Product_Line.findAll({
                raw: true
            })

            resolve({
                errCode: 0,
                message: 'OK',
                product_lines: product_lines
            })
        } catch {
            resolve({
                errCode: 1,
                message: 'Có lỗi xảy ra',
            })
        }
    })
}

let createNewProductLine = (data) => {
    return new Promise(async (resolve, reject) => {
        let product_line_info = await db.Product_Line.findOne({
            where: {
                product_line: data.product_line
            }
        })

        if (product_line_info) {
            resolve({
                errCode: 1,
                message: "Dòng sản phẩm đã tồn tại"
            })
        } else {
            try {
                await db.Product_Line.create({
                    product_line: data.product_line,
                    cpu: data.cpu,
                    gpu: data.gpu,
                    ram: data.ram,
                    memory: data.memory,
                    display: data.display,
                    warranty_period: data.warranty_period
                })

                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            } catch {
                resolve({
                    errCode: 2,
                    message: 'Có lỗi xảy ra'
                })
            }
        }
    })
}

module.exports = {
    createProduct: createProduct,
    relocateProduct: relocateProduct,
    getGoodProducts: getGoodProducts,
    getBadProducts: getBadProducts,
    getProductsOfCustomer: getProductsOfCustomer,
    getAllProductLines: getAllProductLines,
    createNewProductLine: createNewProductLine
}