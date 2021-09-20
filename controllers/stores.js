const { v4: uuidv4 } = require('uuid');
const  { Store } = require("../models/store");
const { common, validations } = require("../helpers");
const { listStoreSchema, nearbySchema, updateStoreSchema, createNewStoreSchme } = validations;
const { calculateDistance, setCache, getCache } = common;

const list = async (params = {}, projection = { _id: 0 }) => {
    projection = Object.assign(projection, { _id: 0 });
    try {
        params = await listStoreSchema.validateAsync(params);
        let cacheKey = !!Object.keys(params).length ? params : `listAllStores`;
        let stores = getCache(cacheKey) || [];
        if (stores && stores.length) {
            return stores;
        }
        stores =  await Store.find(params, projection);
        stores = stores.map(x => x && x.toJSON());
        setCache(cacheKey, stores);
        return stores;
    } catch (error) {
        throw new Error(error);
    }
}

const update = async(queryParams, updateParams) => {
    try {
        queryParams = await listStoreSchema.validateAsync(queryParams);
        updateParams = await updateStoreSchema.validateAsync(updateParams);
        return await Store.findOneAndUpdate(queryParams, updateParams, { new: true });
    } catch (error) {
        throw new Error(error);
    }
}

const create = async(params) => {
    try {
        params = await createNewStoreSchme.validateAsync(params);
        params.uuid = uuidv4();
        params.storeId = params.uuid;
        return await Store.create(params);
    } catch (error) {
        throw new Error(error);
    }
}

const findNearbyStores = async(stores, params) => {
    try {
        let value = await nearbySchema.validateAsync(params);
        let pointA = { lat1, long1 } = value;
        let nearBy = getCache(pointA) || [];
        if (nearBy && nearBy.length) {
            return nearBy;
        }
        for (let store of stores) {
            let pointB = { lat2: store.latitude, long2: store.longitude };
            let distanceFromUser = calculateDistance(pointA, pointB, params.unit);
            nearBy.push(Object.assign({}, store, { distanceFromUser }));
        }
        nearBy.sort((x, y) => x.distanceFromUser - y.distanceFromUser);
        nearBy = nearBy.splice(0,4);
        setCache(pointA, nearBy);
        return nearBy;
    } catch (error) {
        throw new Error(error.toString());
    }
}


exports.list = list;
exports.update = update;
exports.create = create;
exports.findNearbyStores = findNearbyStores;