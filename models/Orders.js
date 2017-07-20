// const bcrypt = require('bcrypt-nodejs');
// const crypto = require('crypto');
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  unit1: String,
  price: Number,
  unit2: String,
  remark: String,

  qty: Number,
  totalPrice: Number
});

const orderSchema = new mongoose.Schema({
  email: { type: String },
  // password: String,
  // passwordResetToken: String,  
  number: Number,
  name:String,
  date: { type: Date, default: Date.now },
  status: String,
  totalPrice: Number,
  eTakeTime: Date,
  aTakeTime: Date,
  items: [itemSchema]
}, { timestamps: true });
  // facebook: String,
  // twitter: String,
  // google: String,
  // github: String,
  // instagram: String,
  // linkedin: String,
  // steam: String,
  // tokens: Array,

  // profile: {
  //   name: String,
  //   gender: String,
  //   location: String,
  //   website: String,
  //   picture: String
  // }


/**
 * Password hash middleware.
 */
// orderSchema.pre('save', function save(next) {
//   const order = this;
//   if (!order.isModified('password')) { return next(); }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) { return next(err); }
//     bcrypt.hash(order.password, salt, null, (err, hash) => {
//       if (err) { return next(err); }
//       order.password = hash;
//       next();
//     });
//   });
// });

/**
 * Helper method for validating order's password.
//  */
// orderSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     cb(err, isMatch);
//   });
// };

// /**
//  * Helper method for getting order's gravatar.
//  */
// orderSchema.methods.gravatar = function gravatar(size) {
//   if (!size) {
//     size = 200;
//   }
//   if (!this.email) {
//     return `https://gravatar.com/avatar/?s=${size}&d=retro`;
//   }
//   const md5 = crypto.createHash('md5').update(this.email).digest('hex');
//   return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
// };

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
