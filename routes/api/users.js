var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var User = require('../../models/User');
var utils = require('../../helpers/utils');

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
 * @apiParam {String} name
 * @apiParam {String} email
 * @apiParam {String} password
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

/**
 * @api {post} /api/users/blacklist Blacklist a website
 * @apiName PostBlacklist
 * @apiGroup User
 * @apiDescription This path adds a blacklisted site to a users profile
 * @apiParam {String} userid
 * @apiParam {String} site
 * @apiSuccessExample Success-Response
 * {
 *   "success": true
 * }
*/
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
    if (doc == undefined)
      return next({
        status: 400,
        message: "User not found"
      });

    var s = utils.encodeDot(req.body.site);
    doc.blacklisted[s] = true;
    //doc.markModified('blacklisted.' + req.body.site);
    doc.markModified('blacklisted');
    doc.save(function(err, up) {
      if (err)
        return next(err);
      res.json({
        success: true
      });
    });
  });
});

/**
 * @api {post} /api/users/blacklistmany Blacklist many websites
 * @apiName PostBlacklistMany
 * @apiGroup User
 * @apiDescription This path adds a list of blacklisted site to a users profile
 * @apiParam {String} userid
 * @apiParam {[String]} sites
 * @apiSuccessExample Success-Response
 * {
 *   "success": true
 * }
*/
router.post('/blacklistmany', function(req, res, next) {
  if (req.body.userid === undefined)
    return next({
      message: "Must supply userid"
    });

  if (req.body.sites === undefined)
    return next({
      message: "Must supply sites"
    });

  User.findById(req.body.userid, function(err, doc) {
    if (err)
      return next(err);
    if (doc == undefined)
      return next({
        status: 400,
        message: "User not found"
      });

    req.body.sites.forEach(function(as) {
      var s = utils.encodeDot(as);
      doc.blacklisted[s] = true;
    });
    //doc.markModified('blacklisted.' + req.body.site);
    doc.markModified('blacklisted');
    doc.save(function(err, up) {
      if (err)
        return next(err);
      res.json({
        success: true
      });
    });
  });
});

/**
 * @api {post} /api/users/addpage Add a visited page
 * @apiName PostAddpage
 * @apiGroup User
 * @apiDescription This path adds a page to user browsing history
 * @apiParam {String} userid
 * @apiParam {String} site
 * @apiSuccessExample Success-Response
 * {
 *   "success": true
 * }
*/
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
    if (doc == undefined)
      return next({
        status: 400,
        message: "User not found"
      });

    var bl = false;
    var site = utils.encodeDot(req.body.site);
    if (doc.blacklisted[site] !== undefined && doc.blacklisted[site])
      bl = true;

    doc.browsingHistory.push({
      websiteName: req.body.site,
      blacklisted: bl,
      startTime: new Date()
    });

    if (bl) {
      doc.runningCost += doc.costPerPage;
      doc.charges += 1;

      if (charges % 15 == 0) {
        util.chargeAccount(doc.stripeID, doc.runningCost);
        doc.donated += doc.runningCost;
        doc.runningCost = 0;
        doc.charges = 0;
      }
    }

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
 * @api {post} /api/users/insertpage Insert a visited page
 * @apiName PostInsertpage
 * @apiGroup User
 * @apiDescription This path inserts a page to user browsing history allowing a date
 * @apiParam {String} userid
 * @apiParam {String} site
 * @apiParam {Date} startTime
 * @apiSuccessExample Success-Response
 * {
 *   "success": true
 * }
*/
router.post('/insertpage', function(req, res, next) {
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

    var bl = false;
    var site = utils.encodeDot(req.body.site);
    if (doc.blacklisted[site] !== undefined && doc.blacklisted[site])
      bl = true;

    doc.browsingHistory.push({
      websiteName: req.body.site,
      blacklisted: bl,
      startTime: req.body.time
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
 * @api {post} /api/users/authenticate Authenticate User
 * @apiName PostAuthenticate
 * @apiGroup User
 * @apiDescription This path authenticates a user
 * @apiParam {String} email
 * @apiParam {String} password
 * @apiSuccessExample Success-Response
 * {
 *   "success": true
 * }
*/
router.post('/authenticate', function(req, res, next) {
  User.findOne({ email: req.body.email }, function(err, doc) {
    if (err)
      return next(err);
    if (doc == undefined) {
      return next({
        status: 400,
        message: "User does not exist"
      });
    }
    if (doc.password !== req.body.password) {
      return next({
        status: 403,
        message: "Authentication failed"
      });
    }

    if (!doc.twoFactorEnabled)
      res.json({
        success: true,
        loggedIn: true,
        user: doc
      });
    else {
      return next({
        message: "User must use two factor authentication"
      });
    }
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
 *   "user": {
 *     "_id": "583003f9284d9222bf802777",
 *     "updatedAt": "2016-11-19T14:05:27.455Z",
 *     "createdAt": "2016-11-19T07:49:13.871Z",
 *     "name": "Radue Bhangra",
 *     "email": "rbhang3@gmail.com",
 *     "password": "foobar",
 *     "__v": 2,
 *     "browsingHistory": [
 *       {
 *         "websiteName": "google.com",
 *         "blacklisted": false,
 *         "startTime": "2016-11-19T14:04:55.957Z",
 *         "_id": "58305c07fb3d1c3f58d68ba2"
 *       },
 *       {
 *         "websiteName": "reddit.com",
 *         "blacklisted": true,
 *         "startTime": "2016-11-19T14:05:27.453Z",
 *         "_id": "58305c27fb3d1c3f58d68ba3"
 *       }
 *     ],
 *     "blacklisted": {
 *       "reddit": true,
 *       "bms": true,
 *       "reddit%2Ecom": true
 *     },
 *     "twoFactorExpire": "2016-11-19T13:32:46.029Z",
 *     "twoFactorCode": "",
 *     "twoFactorEnabled": false
 *   }
 * }
*/

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, doc) {
    if (err)
      return next(err);
    if (doc == undefined) {
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
      return next(err);
    res.json({
      "success": true
    });
  });
});

module.exports = router;
