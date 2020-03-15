var express = require('express');
var router = express.Router();
const db = require('../models/index');
const AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");

let s3 = new AWS.S3();
router.get('/', async function (req, res) {
    let count = 0;
    var text = [];
    try {
        // count = await db.Board.count()
        // console.log("get board" + count);
        db.Board.findAndCountAll({
            offset: 0,
            limit: 5
        }).then(result => {
            console.log("There____" + result.count);
            count = result.count;
            console.log("There____" + result.rows);
            text = result.rows;
            return res.json({ success: true, count: count, text: text })
        })
    } catch (e) {
        console.log(e);
        res.json({ success: false });
    }
});

router.get('/:idx', async function (req, res) {
    try {
        console.log("page 이동")
        let pageNum = req.params.idx; // 요청 페이지 넘버
        let offset = 0;

        if (pageNum > 1) {
            offset = 5 * (pageNum - 1);
        }

        db.Board.findAndCountAll({
            offset: offset,
            limit: 5

        }).then(result => {
            console.log("There____" + result.count);
            console.log("There____" + result.rows);
            
            return res.json({ success: true, count: result.count, text: result.rows })
        })
    } catch (e) {
        console.log(e);
        res.json({ success: false });
    }
});

router.get('/:idx', async function (req, res) {
    try {
        console.log("page 이동")
        let pageNum = req.params.idx; // 요청 페이지 넘버
        let offset = 0;

        if (pageNum > 1) {
            offset = 5 * (pageNum - 1);
        }

        db.Board.findAndCountAll({
            offset: offset,
            limit: 5

        }).then(result => {
            console.log("There____" + result.count);
            console.log("There____" + result.rows);
            
            return res.json({ success: true, count: result.count, text: result.rows })
        })
    } catch (e) {
        console.log(e);
        res.json({ success: false });
    }
});
router.get('/text/:idx', async function (req, res) {
    try {
        console.log("Detail")
        db.Board.findOne({
            id: req.params.idx
        }).then(result => {
            console.log("DD______" + result);
            return res.json({ success: true,text: result})
        })
    } catch (e) {
        console.log(e);
        res.json({ success: false });
    }
});

router.post('/register', async function (req, res, next) {
    try {
        let data = req.body;
        await db.Board.create({
            title: data.title,
            contents: data.contents,
            img: null
        });
        res.json({ success: true });
    } catch (e) {
        console.error(e);
        res.json({ success: false });
    }
}
);


module.exports = router;