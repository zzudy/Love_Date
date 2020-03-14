var express = require('express');
var router = express.Router();
const controller = require('../controller/controller');

/* GET home page. */

router.get('/', function(req, res, next) {
  console.log(req.user)

  res.send("환영합니다 ~");
});
router.get('/main', function(req, res, next) {
  console.log(req.user)
});
module.exports = router;
