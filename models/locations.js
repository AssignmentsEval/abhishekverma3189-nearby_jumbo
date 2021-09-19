const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
    field_1: { type: String },
}, {
    timestamps: true
}, );

// LocationSchema.statics.findByLogin = async function (login) {
//   let user = await this.findOne({
//     username: login,
//   });

//   if (!user) {
//     user = await this.findOne({ email: login });
//   }

//   return user;
// };

// LocationSchema.pre('remove', function (next) {
//   this.model('Message').deleteMany({ user: this._id }, next);
// });

const Location = mongoose.model('Location', LocationSchema);

export default User;
