var express = require('express');
var router = express.Router();
const db = require('../models/index');
const passport = require('passport');
const controller = require('../controller/controller');

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
router.post('/invite', async function (req, res, next) {
  invitee = req.body.invitee
  let user = null;
  try{
    user =  await db.User.findOne({where: {email: invitee}});
    if (!user) return res.json({ success: false, message: "존재하지 않는 유저입니다." })
    if (user.cp_id != 0) return res.json({ success: false, message: "이미 매칭되어있는 유저입니다." })
    controller.create_code(req.user, user).then(result => {
      var token = result
      console.log(token)
      return res.json({success: true, token: token });
    });
  } catch(err){
    return res.json({ success: false, message: err })
  }
});
router.post('/matching', async function (req, res, next) {
  token = req.body.token
  let invite = null;
  var invite_email = null;
  var invited_email = null;
  var cp_id = null;
  try{
    invite =  await db.Invite.findOne({where: {token: token}});
    if (!invite) return res.json({ success: false, message: "코드 틀림" })
    invite_email = invite.inviter_id;
    invited_email = invite.invitee_id;
    cp_id = invite.id;
    if (req.user.email != invite.invitee_id) return res.json({ success: false, message: '초대받은건 너가 아냐!' })
    
    db.Invite.update({ status: true }, { where: { token: token } })
  } catch(err){
    console.log(err)
    return res.json({ success: false, message: err })
  }
  
  let inviter_user = null;
  try{
    inviter_user =  await db.User.findOne({where: {email: invite_email}});
    inviter_user.update({cp_id: cp_id})
  } catch(err){
    return res.json({ success: false, message: err })
  }

  let invited_user = null;
  try{
    invited_user =  await db.User.findOne({where: {email: invited_email}});
    invited_user.update({cp_id: cp_id})
  } catch(err){
    return res.json({ success: false, message: err })
  }

  return res.json({ success: true, message: "매칭 완료!@!" })
})

router.get('/logined', function (req, res, next) {
  console.log("login..")
  if (req.user) return res.json({ success: true, message: "로그인 되어있는 상태" })
});

router.post('/login', function (req, res, next) {
  console.log("post login")
  req.query = null;
  passport.authenticate('login', { session: false }, function (err, user) {
    if (err || !user) {
      return res.json({ success: false });
    }
    return req.login(user, loginError => {
      if (loginError) {
        console.error(loginError);
      }
      return res.json({ success: true, match: user.cp_id});
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
  console.log("logout!!!")
  req.session.destroy();
  res.clearCookie('sid');
  req.logout();
  //res.redirect('/');
  return res.json({ success: true, message: "로그아웃 상태" })
})
module.exports = router;