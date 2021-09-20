const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: [true, 'Email is mandatory'], unique: true },
    password: { type: String, required: [true, 'Password is mandatory'] },
}, {
    toJSON: { getters: true, virtuals: true },
    timestamps:  { createdAt: 'created_at', updatedAt: 'updated_at' }
});


const User = mongoose.model('User', UserSchema);
module.exports.User = User;