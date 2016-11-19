var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var User = require('../../models/User');

/**
 * @api {get} /api/users Get All Users
 * @apiName GetUsers
 * @apiGroup User
 * @apiDescription This path gets a list of all users
 * @apiSuccessExample Success-Response
 * [...]
*/
router.get('/', function(req, res, next) {
  User.find(function(err, doc) {
    if (err)
      return next(err);
    res.json(doc);
  });
});

/**
 * @api {post} /api/users Create User
 * @apiName PostUsers
 * @apiGroup User
 * @apiDescription This path creates a user from request body data
 * @apiSuccessExample Success-Response
 * {
 *   "success": true
 * }
*/
router.post('/', function(req, res, next) {
  req.body.blacklisted = {};
  User.create(req.body, function(err, doc) {
    if (err)
      return next(err);
    res.json({
      success: true,
      user: doc
    });
  });
});

router.post('/blacklist', function(req, res, next) {
  if (req.body.userid === undefined)
    return next({
      message: "Must supply userid"
    });

  if (req.body.site === undefined)
    return next({
      message: "Must supply site"
    });

  User.findById(req.body.userid, function(err, doc) {
    if (err)
      return next(err);
    if (doc === undefined)
      return next({
        status: 400,
        message: "User not found"
      });

    doc.blacklisted[req.body.site] = true;
    doc.markModified('blacklisted.' + req.body.site);
    doc.save(function(err, up) {
      if (err)
        return next(err);
      res.json({
        success: true
      });
    });
  });
});


router.post('/addpage', function(req, res, next) {
  if (req.body.userid === undefined)
    return next({
      message: "Must supply userid"
    });

  if (req.body.site === undefined)
    return next({
      message: "Must supply site"
    });

  User.findById(req.body.userid, function(err, doc) {
    if (err)
      return next(err);
    if (doc === undefined)
      return next({
        status: 400,
        message: "User not found"
      });

    bl = false;
    if (doc.blacklisted[site] !== undefined && doc.blacklisted[site])
      bl = true;

    doc.browsingHistory.push({
      websiteName: site,
      blacklisted: bl,
      startTime: new Date()
    });

    doc.save(function(err) {
      if (err)
        return next(err);
      res.json({
        success: true
      });
    });
  });
});

/**
 * @api {get} /api/users/:id Get Users by ID
 * @apiName GetUsersID
 * @apiGroup User
 * @apiDescription This path gets a user by passing in the ID to the url
 * @apiExample Example Path:
 *    /api/users/583003f9284d9222bf802777
 * @apiSuccessExample Success-Response
 * {
 *   "success": true,
 *   "user": {...}
 * }
*/

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, doc) {
    if (err)
      return next(err);
    if (doc === undefined) {
      err.status = 400;
      return next(err);
    }
    res.json({
      success: true,
      user: doc
    });
  });
});

/**
 * @api {delete} /api/users/:id Delete Users by ID
 * @apiName DeleteUsersID
 * @apiGroup User
 * @apiDescription This path Deletes a user by passing in the ID to the url
 * @apiExample Example Path:
 *    /api/users/583003f9284d9222bf802777
 * @apiSuccessExample Success-Response
 * {
 *   "success": true
 * }
*/
router.delete('/:id', function(req, res, next) {
  User.remove({ _id: req.params.id }, function(err, doc) {
    if (err)
      return next(err)
    res.json({
      "success": true
    });
  });
});

module.exports = router;
