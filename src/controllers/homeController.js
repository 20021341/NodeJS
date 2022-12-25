let homeService = require('../services/homeService');

let handleLogin = async (req, res) => {
    if (!req.body.facility_id || !req.body.password) {
        return res.status(200).json({
            errCode: 1,
            message: 'Nhập thiếu thông tin',
        });
    }

    let data = await homeService.login(req.body);

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        facility: data.facility
    })
}

module.exports = {
    handleLogin: handleLogin,
}