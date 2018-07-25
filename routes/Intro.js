var express = require('express');
var router = express.Router();
var rootdir = (__dirname + '/../');
const pug = require('pug');

/* GET Home page. */
router.get('/', (req,res) => {
    res.render(rootdir + 'views/Intro',{name: 'Introduction to Hearing in Vertebrates'})
});

module.exports = router;

