const  { Store } = require("../models/store");

const list = async (query = {}, projection = {_id: 0}) => {
    projection = Object.assign(projection, { _id: 0 });
    try {
        return await Store.find(query, projection);
    } catch (error) {
        throw new Error("Unable to fetch stores list");
    }
}

const update = async(storeId, params) => {
    try {
        return await Store.findOneAndUpdate({ uuid: storeId }, params, { new: true });
    } catch (error) {
        throw new Error("Unable to update store");
    }
}

const create = async(params) => {
    try {
        return await Store.create(params);
    } catch (error) {
        throw new Error("Unable to update store");
    }
}

exports.list = list;
exports.update = update;
exports.create = create;