var settings = require('../config/settings');
var stripe = require('stripe')(settings.stripeTest);

function gen2fKey() {
  var res = [];
  for (var i = 0; i < 64; i++) {
    res.push(String.fromCharCode(Math.floor(Math.random() * (127 - 33)) + 33));
  }
  return res.join('');
}

function addMinutes(minutes) {
  var date = new Date();
  return new Date(date.getTime() + minutes*60000);
}

function encodeDot(s) {
  return s.split('.').join('%2E');
}

function chargeAccount(customerID, amount) {
  stripe.charges.create({
    amount: amount,
    currency: "usd",
    customer: customerID
  });
}

module.exports = {
  addMinutes: addMinutes,
  encodeDot: encodeDot,
  gen2fKey: gen2fKey,
  chargeAccount: chargeAccount
}
