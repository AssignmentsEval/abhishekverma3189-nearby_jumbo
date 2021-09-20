const { v4: uuidv4 } = require('uuid');
const  { Store } = require("../models/store");
const { common, validations } = require("../helpers");
const { listStoreSchema, nearbySchema, updateStoreSchema, createNewStoreSchme } = validations;
const { calculateDistance, setCache, getCache } = common;

/**
 * Returns an array of stores or details of a store
 * based on params.
 * @param {object} params - ex: {} or { storeId: 1234 }
 * @param {object} projection - ex: {} or { name: 1 }
 * @returns {Array} Array of store/stores - ex: [{storeDetails}, {storeDetails}]
 * or [{storeDetails}]
 * or []
 */
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
        if (!stores || !stores.length) {
            return [];
        }
        stores = stores.map(x => x && x.toJSON());
        setCache(cacheKey, stores);
        return stores;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Updates store details. Returns the updated store
 * @param {object} queryParams - ex: {} or { storeId: 1234, name: Real }
 * @param {object} updateParams - ex: {} or { name: Edited, lat: 56.78 }
 * @returns {object} Updated store - ex: { name: Edited, lat: 56.78 }
 */
const update = async(queryParams, updateParams) => {
    try {
        queryParams = await listStoreSchema.validateAsync(queryParams);
        updateParams = await updateStoreSchema.validateAsync(updateParams);
        return await Store.findOneAndUpdate(queryParams, updateParams, { new: true });
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Creates a new Store.
 * @param {object} params - ex: { storeId: 1234, name: Real }
 * @returns {object} new store - ex: { storeId: 1234, name: Real }
 */
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

/**
 * Return an array of top 5 nearby stores
 * @param {object} params - ex: { lat1: 12.34, long1: 45.67, unit: "K" or "M" }
 * @returns {Array} new store - ex: [{ storeId: 1234, name: Real, distance: 4 }]
 */
const findNearbyStores = async(stores, params) => {
    try {
        let value = await nearbySchema.validateAsync(params);
        let pointA = { lat1, long1, unit } = value;
        let nearBy = getCache(pointA) || [];
        if (nearBy && nearBy.length) {
            return nearBy;
        }
        for (let store of stores) {
            let pointB = { lat2: store.latitude, long2: store.longitude };
            let distanceFromUser = calculateDistance(pointA, pointB, unit);
            nearBy.push(Object.assign({}, store, { distanceFromUser }));
        }
        nearBy.sort((x, y) => x.distanceFromUser - y.distanceFromUser);
        nearBy = nearBy.splice(0,4);
        setCache(pointA, nearBy);
        return nearBy;
    } catch (error) {
        throw new Error(error);
    }
}

exports.list = list;
exports.update = update;
exports.create = create;
exports.findNearbyStores = findNearbyStores;