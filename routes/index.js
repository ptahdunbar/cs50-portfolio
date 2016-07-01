var express = require('express');
var router = express.Router();
var db = require('../db')

/* GET home page. */
router.get('/', function(req, res, next) {

  db.find('booty', {}, function(err, data) {
    if (err) throw err
    res.render('index', {
      title: 'Express',
      submission: null,
      entries: data
    });
  })
});

router.post('/', function(req, res, next) {

  var submission = false

  var tlds = [
    '.edu',
    '.pirate',
  ]

  for (tld in tlds) {
    if ( req.body.email.endsWith(tlds[tld]) ) {
      submission = true
    }
  }

  var data = {
    email: req.body.email,
    message: req.body.message
  }

  if ( submission ) {
    // send to database
    db.insert('booty', data, function(){
      console.log('booty')
    })
  }

  res.render('index', {
    title: 'Express',
    submission: submission,
    email: req.body.email,
    message: req.body.message
  });
});

router.get('/contact-entries', function(req, res, next) {
  db.find('booty', {}, function(err, data) {
    if (err) throw err
    res.send(data)
  })
});

module.exports = router;
