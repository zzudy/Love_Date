var express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();
var mysqlDB = require('../mysql-db');
var crypto = require('crypto');
var key_for_verify;

router.post('/sign-up', function (req, res, next) {
    var body = req.body
    var userPw = body.pw
    var useremail = body.email
    var key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
    var key_two = crypto.randomBytes(256).toString('base64').substr(50, 5);
    key_for_verify = key_one + key_two;
    
    mysqlDB.query('INSERT INTO user(cp_id, email, password, vertify) VALUES (NULL, "' + useremail + '","' + userPw + '","' + 0 +'")');
    mysqlDB.query('INSERT INTO Token(token, email) VALUES ("' + key_for_verify + '","' + useremail+'")');
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'wngus1100@gmail.com',  // gmail 계정 아이디를 입력
            pass: 'gus183400'          // gmail 계정의 비밀번호를 입력
        }
    });

    var url = 'http://localhost:3000/auth/email?key=' + key_for_verify;
    let mailOptions = {

        from: 'wngus1100@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: useremail,                     // 수신 메일 주소
        subject: 'Sending Email using Node.js',   // 제목
        html: '<p>아래의 링크를 클릭해주세요 !</p>' + url
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
    //res.redirect("/auth");
    return res.json("success")
});
router.post("/login", function (req, res) {
    var body = req.body
    var userPw = body.pw
    var useremail = body.email
    console.log("D")
    console.log(useremail)
    console.log(userPw)
    mysqlDB.query('SELECT vertify, password from user WHERE email = "' +useremail+'"' , function(err, rows, fields){
        console.log(rows)
        if (err) throw err;
        else if(rows[0].password == userPw && rows[0].vertify == 1) return res.json({ success: true });
        else return res.json({ success: false });
    });
    // console.log(result);
});

router.get("/email", function (req, res) {
    console.log("email인증")
    let token = req.query.key;
    // token이 일치하면 테이블에서 email을 찾아 회원가입 승인 로직 구현
    mysqlDB.query('UPDATE user SET vertify =1 WHERE email in (SELECT email from Token WHERE token = '+'"' +token+'")');
});
module.exports = router;