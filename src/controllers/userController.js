let userService = require('../services/userService');

let handleLogin = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let userData = await userService.userLogin(req.body.username, req.body.password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {},
    });
}

let handleCreateUser = async (req, res) => {
    if (!req.body.name
        || !req.body.username
        || !req.body.password
        || !req.body.address
        || !req.body.role) {
        // khong nhap du thong tin
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters',
        });
    }

    let check = await userService.createNewUser(req.body);
    if (check) {
        return res.status(200).json({
            errCode: 0,
            message: 'Create user success',
        });
    } else {
        return res.status(500).json({
            errCode: 2,
            message: 'user already exists',
        });
    }

}

let handleUpdateUser = async (req, res) => {
    if (!req.body.name
        || !req.body.address) {
        // khong nhap du thong tin
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters',
        });
    }

    let check = await userService.updateUser(req.body);

    if (check) {
        return res.status(200).json({
            errCode: 0,
            message: 'Update user success',
        });
    } else {
        return res.status(200).json({
            errCode: 3,
            message: 'Cannot update user',
        });
    }
}

let handleGetUserByID = async (req, res) => {
    if (!req.query.id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing query parameters',
        });
    }

    let userData = await userService.getUserInfoByID(req.query.id);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {},
    });
}

let handleGetAllUsers = async (req, res) => {
    let allUsers = await userService.getAllUsers();
    return res.status(200).json({
        errCode: allUsers.errCode,
        message: allUsers.message,
        user: allUsers.users ? allUsers.users : {},
    });

}

module.exports = {
    handleLogin: handleLogin,
    handleCreateUser: handleCreateUser,
    handleUpdateUser: handleUpdateUser,
    handleGetUserByID: handleGetUserByID,
    handleGetAllUsers: handleGetAllUsers,
}