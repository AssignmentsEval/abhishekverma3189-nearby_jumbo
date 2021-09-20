const express = require('express');
const router = express.Router();
const { common } = require("../helpers/");
const storeCtrl = require("../controllers/stores");
const { verify } = require('../middleware');

router.all('*', verify);

/* List all stores. */
router.get('/', (req, res) => {
    return storeCtrl.list()
    .then(stores => {
        return common.sendSuccessResp(res, "List of stores")(stores);
    })
    .catch(err => {
        return common.sendFailureResp(res)(err.toString());
    });
});

router.get('/nearby', (req, res) => {
    if (!req.body || !req.body.lat1 || !req.body.long1) {
        return common.sendFailureResp(res)("Invalid parameters");
    }
    return storeCtrl.list()
    .then(stores => {
        let pointA = { lat1, long1 } = req.body;
        let temp = [];
        for (let store of stores) {
            store = store.toJSON();
            let pointB = { lat2: store.latitude, long2: store.longitude };
            let distanceFromUser = common.calculateDistance(pointA, pointB, req.body.unit);
            temp.push(Object.assign({}, store, { distanceFromUser }));
        }
        temp.sort((x, y) => x.distanceFromUser - y.distanceFromUser);
        temp = temp.splice(0,4);
        return common.sendSuccessResp(res, "Nearby Stores")(temp);
    })
    .catch(err => {
        return common.sendFailureResp(res)(err.toString());
    });
});

router.get('/:store_id', (req, res) => {
    let storeId = req.params && req.params.store_id ? req.params.store_id : null;
    return storeCtrl.list({ uuid: storeId })
    .then(store => {
        return common.sendSuccessResp(res, "Store Details")(store);
    })
    .catch(err => {
        return common.sendFailureResp(res)(err.toString());
    });
});

router.put('/:store_id', (req, res) => {
    let storeId = req.params && req.params.store_id ? req.params.store_id : null;
    let params = req.body || null;
    if (!storeId || !params) {
        return common.sendFailureResp(res)("Invalid update parameters");
    }
    storeCtrl.update(storeId, params)
    .then(store => {
        return common.sendSuccessResp(res, "Store Details Updated")(store);
    })
    .catch(err => {
        return common.sendFailureResp(res)(err.toString());
    });
});

router.post('/', (req, res) => {
    let params = req.body || null;
    if (!params) {
        return common.sendFailureResp(res)("Invalid create parameters");
    }
    storeCtrl.create(params)
    .then(store => {
        return common.sendSuccessResp(res, "Store Details Updated")(store);
    })
    .catch(err => {
        return common.sendFailureResp(res)(err.toString());
    });
});


module.exports = router;
