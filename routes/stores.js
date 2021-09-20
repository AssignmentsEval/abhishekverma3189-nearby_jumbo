const express = require("express");
const router = express.Router();
const { common } = require("../helpers");
const { verify } = require("../middleware");
const storeCtrl = require("../controllers/stores");

/**
 * Common gateway for all routes.
 * middleware fn: verify, validates the JWT
 * token in authorization headers.
 */
router.all("*", verify);

/**
 * Accepts email and password in request body and
 * returns an array of all stores.
 * @route GET /store
 * @group Store
 * @returns {Success.model} 200 - An object with success status, message and data
 * @returns {Error.model} 200 - An object with success status, message and data
 */
router.get("/", (req, res) => {
    return storeCtrl.list()
    .then(stores => common.sendSuccessResp(res, "List of stores")(stores))
    .catch(err => common.sendFailureResp(res)(err.toString()));
});

/**
 * List details as per the storeId in params.
 * @route GET /store/:storeId - ex: /store/123ABC
 * @group Store
 * @returns {Success.model} 200 - An object with success status, message and data
 * @returns {Error.model} 200 - An object with success status, message and data
 */
router.get("/:storeId", (req, res) => {
    return storeCtrl.list(req.params)
    .then(store => common.sendSuccessResp(res, "Store Details")(store))
    .catch(err => common.sendFailureResp(res)(err.toString()));
});

/**
 * Updates the details of a store and returns
 * the updated store
 * @route PUT /store/:storeId - ex: /store/123ABC
 * @group Store
 * @returns {Success.model} 200 - An object with success status, message and data
 * @returns {Error.model} 200 - An object with success status, message and data
 */
router.put("/:storeId", (req, res) => {
    return storeCtrl.update(req.params, req.body)
    .then(store => common.sendSuccessResp(res, "Store Details Updated")(store))
    .catch(err => common.sendFailureResp(res)(err.toString()));
});

/**
 * Creates a new store and returns the
 * updated store
 * @route POST /store - ex: /store
 * @group Store
 * @returns {Success.model} 200 - An object with success status, message and data
 * @returns {Error.model} 200 - An object with success status, message and data
 */
router.post("/", (req, res) => {
    return storeCtrl.create(req.body)
    .then(store => common.sendSuccessResp(res, "New store added")(store))
    .catch(err => common.sendFailureResp(res)(err.toString()));
});

/**
 * Accepts lat and long in payload and returns an array of
 * top 5 nearest store.
 * @route POST /store/nearby - ex: /store/nearby
 * @group Store
 * @returns {Success.model} 200 - An object with success status, message and data
 * @returns {Error.model} 200 - An object with success status, message and data
 */
router.post("/nearby", (req, res) => {
    return storeCtrl.list()
    .then(stores => storeCtrl.findNearbyStores(stores, req.body))
    .then(resp => common.sendSuccessResp(res, "Nearby stores")(resp))
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


module.exports = router;
