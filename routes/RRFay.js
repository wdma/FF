var express = require('express');
var router = express.Router();
var rootdir = (__dirname + '/../');
const pug = require('pug');

/* GET Home page. */
router.get('/RRFay', (req,res) => {
    res.render(rootdir + 'views/RRFay',{name: 'Richard R. Fay'})
});

module.exports = router;
