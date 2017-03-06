const express = require('express');

const router = express.Router();
const scheduler = require('./functions'); // for scheduling scrape calls
var jsonfile = require('jsonfile');
const db = require('./dbConnect');
import saver from './gasPriceSaver.js';

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.url);
  console.log(saver.initGasPriceSaver());
});


// Use input from user to get data X days back
router.get('/getRegularPricesXDaysBack/:days', (req, res, next) => {
  db.getRegularPrices(parseInt(req.params.days, 10))
  .then((data) => {
    res.send(data);
  });
});



module.exports = router;
