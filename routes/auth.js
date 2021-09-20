const express = require('express')
const router = express.Router();
const {
    common
} = require("../helpers/");
const userCtrl = require("../controllers/users");

router.get('/fetchToken', (req, res, ) => {
    userCtrl.fetchToken(req.body)
        .then(apiToken => common.sendSuccessResp(res, "API Token")(apiToken))
        .catch(err => common.sendFailureResp(res)(err.toString()));
});


router.post('/createToken', (req, res) => {
    userCtrl.createToken(req.body)
        .then(apiToken => common.sendSuccessResp(res, "API Token created")(apiToken))
        .catch(err => common.sendFailureResp(res)(err.toString()));
});

module.exports = router;