const Joi = require('joi');

const latitudeRegExp = new RegExp(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/i);
const longitudeRegExp = new RegExp(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))/i);

const createTokenSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
exports.createTokenSchema = createTokenSchema;

const nearbySchema = Joi.object({
    lat1: Joi.string().pattern(latitudeRegExp),
    long1: Joi.string().pattern(longitudeRegExp),
    unit: Joi.any().valid('K', 'M').default('K')
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
    "longitude": Joi.string().pattern(longitudeRegExp),
    "latitude": Joi.string().pattern(latitudeRegExp),
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
    "longitude": Joi.string().pattern(longitudeRegExp),
    "latitude": Joi.string().pattern(latitudeRegExp),
    "complexNumber": Joi.string(),
    "showWarningMessage": Joi.boolean(),
    "todayOpen": Joi.string().required(),
    "locationType": Joi.string(),
    "collectionPoint": Joi.boolean(),
    "sapStoreID": Joi.string(),
    "todayClose": Joi.string().required()
});
exports.createNewStoreSchme = createNewStoreSchme;