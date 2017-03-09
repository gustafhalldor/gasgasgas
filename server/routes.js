const express = require('express');

const router = express.Router();
const scheduler = require('./functions'); // for scheduling scrape calls
var jsonfile = require('jsonfile');
const db = require('./dbConnect');
import saver from './gasPriceSaver.js';

/* GET home page. */
router.get('/', (req, res, next) => {
});


// Use input from user to get data X days back
router.get('/getRegularPricesXDaysBack/:days', (req, res, next) => {
  db.getRegularPrices(parseInt(req.params.days, 10))
  .then((data) => {
    res.send(data);
  });
});

router.get('/get95price', (req, res, next) => {
  const file = './server/data/data95.json';
  jsonfile.readFile(file, function(err, data) {
    res.send(data);
  });
});

router.get('/getDieselPrice', (req, res, next) => {
  const file = './server/data/dataDiesel.json';
  jsonfile.readFile(file, function(err, data) {
    res.send(data);
  });
});

router.get('/getCrudeOilPrice', (req, res, next) => {
  const file = './server/data/crudeOil.json';
  jsonfile.readFile(file, function(err, data) {
    res.send(data);
  });
});

module.exports = router;
