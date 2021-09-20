const Joi = require('joi');

/**
 * API
 * createToken
 * nearby
 * list store details
 * update store details
 * create a new store
 */

const createTokenSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});
exports.createTokenSchema = createTokenSchema;

const nearbySchema = Joi.object({
    lat1: Joi.string().required(),
    long1: Joi.string().required(),
    unit: Joi.string().required()
});
exports.nearbySchema = nearbySchema;

const listStoreSchema = Joi.object({
    storeId: Joi.string()
});
exports.listStoreSchema = listStoreSchema;

const updateStoreSchema = Joi.object({
    "city": Joi.string(),
    "postalCode": Joi.string(),
    "street": Joi.string(),
    "street2": Joi.string(),
    "street3": Joi.string(),
    "addressName": Joi.string(),
    "uuid": Joi.string(),
    "id": Joi.string(),
    "longitude": Joi.string(),
    "latitude": Joi.string(),
    "complexNumber": Joi.string(),
    "showWarningMessage": Joi.boolean(),
    "todayOpen": Joi.string(),
    "locationType": Joi.string(),
    "collectionPoint": Joi.boolean(),
    "sapStoreID": Joi.string(),
    "todayClose": Joi.string()
});
exports.updateStoreSchema = updateStoreSchema;

const createNewStoreSchme = Joi.object({
    "city": Joi.string().required(),
    "postalCode": Joi.string().required(),
    "street": Joi.string().required(),
    "street2": Joi.string(),
    "street3": Joi.string(),
    "addressName": Joi.string().required(),
    "longitude": Joi.string().required(),
    "latitude": Joi.string().required(),
    "complexNumber": Joi.string(),
    "showWarningMessage": Joi.boolean(),
    "todayOpen": Joi.string().required(),
    "locationType": Joi.string(),
    "collectionPoint": Joi.boolean(),
    "sapStoreID": Joi.string(),
    "todayClose": Joi.string().required()
});
exports.createNewStoreSchme = createNewStoreSchme;