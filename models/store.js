const mongoose = require("mongoose");

// Store Schema
const StoreSchema = new mongoose.Schema({
    "city": { type: String, required: [true, 'City is mandatory'] },
    "postalCode": { type: String, required: [true, 'Postal Code is mandatory'] },
    "street": { type: String, required: [true, 'Street is mandatory'] },
    "street2": { type: String },
    "street3": { type: String },
    "addressName": { type: String },
    "uuid": { type: String, required: [true, 'uuid is mandatory'] },
    "storeId": { type: String, required: [true, 'storeId is mandatory'] },
    "longitude": { type: String, required: [true, 'Longitude is mandatory'] },
    "latitude": { type: String, required: [true, 'Latitude is mandatory'] },
    "complexNumber": { type: String },
    "showWarningMessage": { type: Boolean },
    "todayOpen": { type: String, required: [true, 'Open Time is mandatory'] },
    "locationType": { type: String },
    "collectionPoint": { type: Boolean },
    "sapStoreID": { type: String },
    "todayClose": { type: String, required: [true, 'Closse Time is mandatory'] }
}, {
    toJSON: { getters: true, virtuals: true },
    timestamps:  { createdAt: 'created_at', updatedAt: 'updated_at' }
});


// Compile the store model from StoreSchema
const Store = mongoose.model('Store', StoreSchema);
module.exports.Store = Store;