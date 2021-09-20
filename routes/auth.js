const express = require('express')
const router = express.Router();
const { common } = require("../helpers/");
const userCtrl = require("../controllers/users");

/**
 * Accepts email and password in request body and
 * returns the JWT token.
 * @route GET /api/auth/fetchToken
 * @group Authentication - API authentication
 * @param {TokenPayload.model} body.body.required
 * @returns {Success.model} 200 - An object with success status, message and data
 * @returns {Error.model} 200 - An object with success status, message and data
 */
router.get('/fetchToken', (req, res) => {
    userCtrl.fetchToken(req.body)
        .then(apiToken => common.sendSuccessResp(res, "API Token")(apiToken))
        .catch(err => common.sendFailureResp(res)(err.toString()));
});


/**
 * Accepts email and password in request body
 * and returns registers the user and
 * returns the JWT token
 * @route GET /api/auth/createToken
 * @group Authentication - API authentication
 * @param {TokenData.model} body.body.required
 * @returns {Success.model} 200 - An object with success status, message and data
 * @returns {Error.model} 200 - An object with success status, message and data
 */
router.post('/createToken', (req, res) => {
    userCtrl.createToken(req.body)
        .then(apiToken => common.sendSuccessResp(res, "API Token created")(apiToken))
        .catch(err => common.sendFailureResp(res)(err.toString()));
});

/**
 * @typedef Error
 * @property {boolean} success - success - ex: true/false
 * @property {string} message - message - ex: User authenticated
 */

/**
 * @typedef Success
 * @property {boolean} success - success - ex: true/false
 * @property {string} data - data - ex: "JWTOKENDATA"
 * @property {string} message - message - ex: User authenticated
*/

/**
 * @typedef TokenPayload
 * @property {string} email - User email - ex: max@test.com
 * @property {string} passsowrd - User password - ex: helloworld
*/

module.exports = router;