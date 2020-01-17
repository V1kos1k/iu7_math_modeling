const express = require('express');
const router = express.Router();
let shell = require('shelljs');

// Render main page
router.get('/', function(req, res) {
    res.set('Content-Type', 'text/html');
    res.sendFile('/static/index.html', { root: './' });
});

router.post('/math', function(req, res) {
  // console.log(req.body);
  // console.log(req.body.pg0_d);
  let result = shell.exec('python3 main.py ' + req.body.pg0_m + ' ' + req.body.pg0_d + ' ' +  req.body.ev0_m + 
            ' ' + req.body.ev0_d + ' ' + req.body.ev1_m + ' ' +  req.body.ev1_d + ' ' +  req.body.ev2_m +
            ' ' + req.body.ev2_d + ' ' + req.body.ev3_m + ' ' +  req.body.ev3_d + ' ' +  req.body.ti0_m +
            ' ' + req.body.ti0_d + ' ' +  req.body.ti1_m + ' ' + req.body.ti1_d + ' ' +  req.body.tu0_m +
            ' ' + req.body.tu0_d + ' ' +  req.body.tu1_m + ' ' +  req.body.tu1_d + ' ' + req.body.tu2_m +
            ' ' + req.body.tu2_d + ' ' +  req.body.es0_m + ' ' +  req.body.es0_d + ' ' + req.body.es1_m + 
            ' ' + req.body.es1_d + ' ' +  req.body.c_count).stdout.split(' ');
  console.log(result);
  res.send(result)
}) 

module.exports = router;
