const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models/index');
const crypto = require('crypto');
const controller = require('../controller/controller');

module.exports = function () {
    passport.serializeUser((user, done) => { 
        console.log('serialize'); 
        done(null, user); 
    }); // 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴. 
    passport.deserializeUser((user, done) => { 
        console.log('deserialize'); 
        done(null, user); 
    });

    passport.use(
        'sign-up',
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'pw',
            session: false,
            passReqToCallback: true
        },
            function (req, email, password, done) {
                try {
                    db.User.findOne({
                        where: {
                            email: email
                        }
                    }).then(function (user) {
                        if (user) return done(null, false, { message: '이미 존재하는 유저입니다.' });
                        const data = req.body
                        const buffer = crypto.randomBytes(64);
                        const salt = buffer.toString('base64');
                        const key = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
                        const hashedPw = key.toString('base64');
                        var key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
                        var key_two = crypto.randomBytes(256).toString('base64').substr(50, 5);
                        key_for_verify = key_one + key_two;
                        controller.email(data.email, key_for_verify)
                        db.User.create({
                            cp_id: null,
                            email: data.email,
                            salt: salt,
                            password: hashedPw,
                            vertify: false,
                            token: key_for_verify
                        }).then(function (result) {
                            done(null, result);
                        }).catch(function (err) {
                            done(err);
                        });
                    });
                } catch (err) {
                    done(err);
                }
            }
        )
    );
    passport.use(
        'login',
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'pw',
            session: false
        },
            function (email, password, done) {
                try {
                    db.User.findOne({
                        where: {
                            email: email
                        }
                    }).then(function (user) {
                        if (user) {
                            //password salt 이용해서 찾는 과정 넣기
                            crypto.pbkdf2(password, user.salt, 100000, 64, 'sha512', function (err, key) {
                                if (err) {
                                    console.log("errr");
                                    return done(null, false)
                                }
                                if (user.password === key.toString('base64')) {
                                    console.log("일치");
                                    return done(null, user);

                                } else {
                                    return done(null, false)
                                }
                            });
                        }
                    });
                } catch (err) {
                    done(err);
                }
            }
        )
    );
}