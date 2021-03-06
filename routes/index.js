var express = require('express');
var router = express.Router();
var path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/landing');
  //res.render('index', { title: 'Express' });
});

router.get('/landing', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views', 'landing.html'));
});

router.get('/demo', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views', 'dashboard.html'));
});

router.get('/2fa', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views', '2fa.html'));
});

router.get('/test', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views', 'test.html'));
});

module.exports = router;
