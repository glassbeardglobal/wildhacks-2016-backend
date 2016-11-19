var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var utils = require('../../helpers/utils');

/**
 * @api {post} /api/billing Billing
 * @apiName PostBilling
 * @apiGroup Billing
 * @apiDescription This path allows a user to set their stripe token
 * @apiParam {string} userid
 * @apiParam {string} stripeToken
 * @apiSuccessExample Success-Response
 * {
 *   "success": true,
 *   "message":"API Root"
 * }
*/
router.post('/', function(req, res, next) {
  if (req.body.userid === undefined)
    return next({
      status: 400,
      message: "Must supply userid"
    });
  if (req.body.stripeToken === undefined)
    return next({
      status: 400,
      message: "Must supply stripeToken"
    });

  User.findOneAndUpdate({ _id: req.body.userid }, { $set: { stripeToken: req.body.stripeToken }}, function(err, doc) {
    if (err)
      return next(err);
    if (doc === undefined)
      return next({
        status: 400,
        message: "User not found"
      });
    res.json({
      success: true
    });
  });
});

module.exports = router;
