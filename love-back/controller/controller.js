
const nodemailer = require('nodemailer');
var controller = {};


controller.email = function (email, token) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'wngus1100@gmail.com',  // gmail 계정 아이디를 입력
          pass: 'gus183400'          // gmail 계정의 비밀번호를 입력
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
module.exports = controller;