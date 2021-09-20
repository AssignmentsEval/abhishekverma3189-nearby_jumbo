const express = require("express");
const router = express.Router();
const { common } = require("../helpers");
const storeCtrl = require("../controllers/stores");
const { verify } = require("../middleware");

router.all("*", verify);

router.get("/", (req, res) => {
    return storeCtrl.list()
    .then(stores => common.sendSuccessResp(res, "List of stores")(stores))
    .catch(err => common.sendFailureResp(res)(err.toString()));
});

router.get("/:storeId", (req, res) => {
    return storeCtrl.list(req.params)
    .then(store => common.sendSuccessResp(res, "Store Details")(store))
    .catch(err => common.sendFailureResp(res)(err.toString()));
});

router.put("/:storeId", (req, res) => {
    return storeCtrl.update(req.params, req.body)
    .then(store => common.sendSuccessResp(res, "Store Details Updated")(store))
    .catch(err => common.sendFailureResp(res)(err.toString()));
});

router.post("/", (req, res) => {
    return storeCtrl.create(req.body)
    .then(store => common.sendSuccessResp(res, "New store added")(store))
    .catch(err => common.sendFailureResp(res)(err.toString()));
});

router.post("/nearby", (req, res) => {
    return storeCtrl.list()
    .then(stores => storeCtrl.findNearbyStores(stores, req.body))
    .then(resp => common.sendSuccessResp(res, "Nearby stores")(resp))
    .catch(err => common.sendFailureResp(res)(err.toString()));
});


module.exports = router;
