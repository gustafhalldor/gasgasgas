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
    db.getAvgGas(parseInt(req.params.days, 10))
    .then((data2) => {
      const obj = {
        data: data,
        avg: data2[0].avg
      }
      res.send(obj);
    })
  });
});

// gets price of oilbarrel as well as the average gas price for those days
router.get('/getOilBarrelPrice/:days', (req, res, next) => {
  db.getOilPriceAndExchangeRate(parseInt(req.params.days, 10))
  .then((data) => {
    db.getAvgOilAndGas(parseInt(req.params.days, 10))
    .then((data2) => {
      const obj = {
        data: data,
        avg: data2[0].avgoil,
        avggas:data2[0].avggas
      }
      res.send(obj);
    })
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
