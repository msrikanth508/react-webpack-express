var express = require('express');
var router = express.Router();

// API 
router.get('/', function(req, res) {
  res.json({
    message: 'Welcome to Dexter',
  })
});


module.exports = router;
