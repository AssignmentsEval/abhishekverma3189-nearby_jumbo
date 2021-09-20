const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./conf/configuration');
const { common } = require("./helpers/");
const { User } = require("./models/user");

exports.verify = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403);
        return common.sendFailureResp(res)("Please provide a valid token");
    }
    jwt.verify(token, jwtSecret, async (err, value) => {
        if (err) {
            return common.sendFailureResp(res)(err);
        }
        const user = await User.findOne({ email: value.data.email, password: value.data.password });
        if (!user) {
            return common.sendFailureResp(res)("Token not mapped to any client");
        }
        req.user = value.data;
        return next();
    })
}