var mongoose = require('mongoose');

var siteDataSchema = new mongoose.Schema({
  websiteName: { type: String, required: true },
  blacklisted: { type: Boolean, required: true },
  startTime: { type: Date },
  endTime: { type: Date }
});

var UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorCode: { type: String, default: "" },
  twoFactorExpire: { type: Date, default: new Date() },
  deviceToken: { type: String },
  blacklisted: { type: Object, default: {}},
  browsingHistory: [siteDataSchema],
  socketID: { type: String },
  stripeID: { type: String },
  runningCost: { type: Number, default: 0 },
  donated: { type: Number, default: 0 },
  charges: { type: Number, default: 0 },
  costPerPage: { type: Number, default: 60 }
},{
  minimize: false,
  timestamps: true
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
