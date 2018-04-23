var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('*', function(req, res) {
  res.render('index', { 
    title: 'React-Webpack-Express', 
    publicPath: process.env.NODE_ENV === 'development' ? '' : 'public/build/',
  });
});
module.exports = router;