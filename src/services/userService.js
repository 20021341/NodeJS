const db = require('../models/index');

let userLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUsername(username);

            if (isExist) {
                let user = await db.Facility.findOne({
                    where: { username: username },
                    raw: true,
                });

                if (user) {
                    if (password.localeCompare(user.password) == 0) {
                        userData.errCode = 0;
                        userData.message = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = 'User not found!';
                }
            } else {
                userData.errCode = 1;
                userData.message = 'User not found!';
            }

            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
}

let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Facility.findOne({
                where: { username: username }
            });

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
}

let createNewUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUsername(userData.username);

            if (check) {
                // username da ton tai
                resolve(false);
            } else {
                // username chua ton tai
                // tao user moi
                await db.Facility.create({
                    name: userData.name,
                    username: userData.username,
                    password: userData.password,
                    address: userData.address,
                    role: userData.role
                });
                resolve(true);
            }

        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Facility.update(
                {
                    name: data.name,
                    address: data.address
                },
                {
                    where: { id: data.id },
                }
            );

            resolve(true);
        } catch (e) {
            resolve(false);
            reject(e);
        }
    });
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.Facility.findAll({
                raw: true
            });

            resolve({
                errCode: 0,
                message: 'OK',
                users: users
            });
        } catch (e) {
            reject(e);
        }
    });
}

let getUserInfoByID = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Facility.findOne({
                where: { facility_id: userID },
                logging: console.log,
                raw: true
            });

            if (user) {
                resolve({
                    errCode: 0,
                    message: 'OK',
                    user: user
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'User not found',
                    user: {}
                });
            }

        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    userLogin: userLogin,
    createNewUser: createNewUser,
    updateUser: updateUser,
    getAllUsers: getAllUsers,
    getUserInfoByID: getUserInfoByID,
}