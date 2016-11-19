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
  blacklisted: { type: Object, default: {}},
  browsingHistory: [siteDataSchema]
},{
  minimize: false,
  timestamps: true
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
