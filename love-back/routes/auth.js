var express = require('express');
var router = express.Router();
const db = require('../models/index');
const passport = require('passport');

router.post('/sign-up', function (req, res, next) {
  req.query = null;
  passport.authenticate('sign-up', function (err, user, info) {
    if (err) {
      console.log(err)
      return res.json({ success: false });
    }
    if (info) {
      console.log(info)
      return res.json({ success: false });
    }
    if (user) {
      console.log(user)
      return res.json({ success: true });
    }
  })(req, res, next);
});

router.get('/logined', function (req, res, next) {
  let session = req.session;
  console.log("login 됫니?")
  console.log(session);
  if(res.user) return res.json({success: true, message:"로그인 되어있는 상태"})
});

router.post('/login', function (req, res, next) {
  console.log("poast login")
  req.query = null;
  passport.authenticate('login', { session: false }, function (err, user) {
    if (err || !user) {
      return res.json({ success: false });
    } 
    return req.login(user, loginError => {
      if (loginError) {
        console.error(loginError);
      }
      return res.json({ success: true });
    });
  })(req, res, next);
}
);

router.get("/email", function (req, res) {
  console.log("email인증")
  let token = req.query.key;
  db.User.update({ vertify: true }, { where: { token: token } })
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.clearCookie('sid');
  req.logout();
  res.redirect('/');
})
module.exports = router;