var express = require('express');
var router = express.Router();
const db = require('../models/index');

router.get('/', async function (req, res) {
    try {
        db.findAll
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