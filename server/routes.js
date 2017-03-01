const express = require('express');

const router = express.Router();
const scheduler = require('./functions'); // for scheduling scrape calls
var jsonfile = require('jsonfile');
// const db = require('./dbConnect');

/* GET home page. */
router.get('/', (req, res, next) => {
  scheduler.setTimer();
});

router.get('/getPrices95', (req, res, next) => {
  let file = './src/tmp/data95.json';
  jsonfile.readFile(file, function(err, obj) {
    console.dir(obj)
    res.json(obj);
  })
});

router.get('/getPricesDiesel', (req, res, next) => {
  let file = './src/tmp/dataDiesel.json';
  jsonfile.readFile(file, function(err, obj) {
    console.dir(obj)
    res.json(obj);
  })
});

router.get('/statistics', (req, res, next) => {

});

module.exports = router;
