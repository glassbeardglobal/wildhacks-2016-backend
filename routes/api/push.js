var express = require('express');
var apn = require('apn');
var path = require('path')
var router = express.Router();

var User = require('../../models/User');
var utils = require('../../helpers/utils');
var su = require('../../helpers/socket-util');


var options = {
  token: {
    key: path.join(__dirname, '..', '..', 'config', 'APNsAuthKey_MRU8H8R6H5.p8'),
    keyId: "MRU8H8R6H5",
    teamId: "68LYEWDX9F"
  },
  production: true
};

var apnProvider = new apn.Provider(options);

router.post('/test', function(req, res, next) {
  if (req.body.userid === undefined)
    return next({
      status: 400,
      message: "Must supply user email"
    });

  User.findById(req.body.userid, function(err, doc) {
    if (err)
      return next(err);
    if (doc == undefined)
      return next({
        status: 400,
        message: "User not found"
      });

    var note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.sound = "ping.aiff";
    note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
    note.payload = {'messageFrom': 'John Appleseed'};
    note.topic = "com.rahulsurti.Swear-Jar-Pro";

    apnProvider.send(note, doc.deviceToken).then(function(result) {
      res.json({
        success: true
      });
    });
  });
});

/**
 * @api {post} /api/push/registertoken Register a device token
 * @apiName PostRegisterToken
 * @apiGroup Push
 * @apiDescription This path registers a token for a given user
 * @apiParam {String} email
 * @apiParam {String} deviceToken
 * @apiSuccessExample Success-Response
 * {
 *   "success": true
 * }
*/
router.post('/registertoken', function(req, res, next) {
  if (req.body.email === undefined)
    return next({
      status: 400,
      message: "Must supply user email"
    });

  if (req.body.deviceToken === undefined)
    return next({
      status:400,
      message: "Must supply deviceToken"
    });

  User.findOne({ email: req.body.email }, function(err, doc) {
    if (err)
      return next(err);
    if (doc === undefined)
      return next({
        status: 400,
        message: "User not found"
      });

    doc.deviceToken = req.body.deviceToken;
    doc.markModified('deviceToken');
    doc.save(function(err) {
      if (err)
        return next(err);
      res.json({
        "success": true
      });
    });
  });
});

router.post('/twofactor', function(req, res, next) {
  if (req.body.email === undefined)
    return next({
      status: 400,
      message: "Must supply user email"
    });

  if (req.body.password === undefined)
    return next({
      status: 400,
      message: "Must supply user password"
    });

  User.findOne({ email: req.body.email }, function(err, doc) {
    if (err)
      return next(err);
    if (doc === undefined)
      return next({
        status: 400,
        message: "User not found"
      });

    if (doc.deviceToken == undefined)
      return next({
        status: 400,
        message: "User has not set up two factor authentication"
      });

    var code = utils.gen2fKey();
    doc.twoFactorCode = code;
    doc.twoFactorExpire = utils.addMinutes(15);
    doc.save(function(err) {
      if (err)
        return next(err);
      res.json({
        "success": true,
        "loggedIn": false,
        "twoFactor": true,
      });
    });
  });
});

router.get('/recieve2fa', function(req, res, next) {
  if (req.query.code === undefined)
    return next({
      status: 400,
      message: "Must supply code"
    });
  if (req.query.userid === undefined)
    return next({
      status: 400,
      message: "Must supply userid"
    });

  User.findById(req.query.userid, function(err, doc) {
    if (err)
      return next(err);
    if (doc === undefined)
      return next({
        status: 400,
        message: "User not found"
      });
    if (doc.twoFactorCode !== req.query.code)
      return next({
        status: 403,
        message: "Code is invalid"
      });

    su.getIO().broadcast.to(doc.socketID).emit('authenticated', true);
    res.json({
      "success": true
    });
  });
});

module.exports = router;
