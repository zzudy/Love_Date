
const nodemailer = require('nodemailer');
require('dotenv').config();
const crypto = require('crypto');
const db = require('../models/index');
var controller = {};



controller.email = function (email, token) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER, // gmail 계정 아이디를 입력
      pass: process.env.MAIL_PASSWORD       // gmail 계정의 비밀번호를 입력
    }
  });
  var url = 'http://localhost:3000/auth/email?key=' + token;
  let mailOptions = {
    from: 'wngus1100@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
    to: email,                     // 수신 메일 주소
    subject: 'Sending Email using Node.js',   // 제목
    html: '<p>아래의 링크를 클릭해주세요 !</p>' + url
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
  });
};

controller.create_code = async function (inviter,invitee) {
  console.log("create invite code")
  var key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
  var key_two = crypto.randomBytes(256).toString('base64').substr(50, 5);
  key_for_verify = key_one + key_two;
  result = await db.Invite.create({
    inviter_id: inviter.email,
    invitee_id: invitee.email,
    token: key_for_verify,
    status: false
  });
  return result.token
};
module.exports = controller;