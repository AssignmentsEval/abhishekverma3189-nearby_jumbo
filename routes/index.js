const express = require('express');
const router = express.Router();
const { Store } = require("../models/store");


/* GET home page. */
router.get('/:id', function (req, res, next) {
    Store.find({}, {}, (err, resp) => {
        console.log(`Err `,err);
        console.log(`Stores `, resp);
        return res.send({
            title: 'Express',
            stores: resp
        });
    });
});

module.exports = router;
