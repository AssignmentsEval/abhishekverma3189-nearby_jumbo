const express = require('express')
const router = express.Router();
const { common } = require("../helpers/");
const userCtrl = require("../controllers/users");

router.post('/createToken', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return common.sendFailureResp(res)("Invalid parameters");
    }
    userCtrl.create({ email: req.body.email, password: req.body.password })
        .then(apiToken => {
            return common.sendSuccessResp(res, "API Token")(apiToken);
        })
        .catch(err => {
            return common.sendFailureResp(res)(err.toString());
        });
});

module.exports = router