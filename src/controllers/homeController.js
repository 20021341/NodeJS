let homeService = require('../services/homeService');

let handleLogin = async (req, res) => {
    if (!req.body.facility_id || !req.body.password) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input paramters',
        });
    }

    let data = await homeService.login(req.body);

    if (data.errCode === 0) {
        return res.status(200).json({
            errCode: 0,
            message: 'Login success',
            facility: data.facility
        });
    } else {
        return res.status(200).json({
            errCode: 1,
            message: data.message,
        });
    }
}

module.exports = {
    handleLogin: handleLogin,
}