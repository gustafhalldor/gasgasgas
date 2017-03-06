
const db = require('./dbConnect');
const scheduler = require('node-schedule');
import data95 from './data/data95.json';

function initGasPriceSaver() {
  const regularGasObject = getRegularAverage();

  db.checkIfAlreadySaved(regularGasObject.date)
  .then((data) => {
    if(data.length === 0) {
      db.saveRegular(regularGasObject);
    }
  });

  // Creating a recurring rule for saving to db
  const rule = new scheduler.RecurrenceRule();
  rule.dayOfWeek = [new scheduler.Range(0, 6)];  // runs every day of the week
  // runs at 4 hour intervals over the day and on these hours
  rule.hour = [9, 16];
  rule.minute = 0;
  scheduler.scheduleJob(rule, () => {
    db.checkIfAlreadySaved(regularGasObject.date)
      .then((data) => {
        if(data.length === 0) {
          db.saveRegular(regularGasObject);
        }
      })
      .catch((error) => {
      });
  });
}

// not calculating any averages actually... Very rarely that prices change over the
// course of the day so just sticking to the most frequent price for each company.
function getRegularAverage() {
  let average = {};

  average.date = getDateTime(); //yyyy-mm-dd
  average.orkan = data95.orkan[4].price;
  average.orkanx = data95.orkan[0].price;
  average.dælan = data95.dælan[0].price;
  average.atlantsolía = data95.atlantsolía[1].price;
  average.n1 = data95.n1[0].price;
  average.ob = data95.ob[0].price;
  average.olís = data95.olís[0].price;
  average.skeljungur = data95.skeljungur[0].price;

  return average;
}

function getDateTime() {
  const currentdate = new Date();

  let day = currentdate.getDate();
  let month = currentdate.getMonth()+1;
  let year = currentdate.getFullYear();

  // Add zero to segment if it is only 1 character, f.ex. 1 second should be 01 second.
  // Having 'year' in the array is redundant, but I'm keeping it there for clarity's sake.
  let arr = [year, month, day];
  for (var i = 0; i < arr.length; i++) {
    if(arr[i].toString().length === 1) {
      arr[i] = '0' + arr[i];
    }
  }

  // dd-mm-yyyy
  const datetime = arr[0] + "-"
                 + arr[1] + "-"
                 + arr[2];
  return datetime;
}

module.exports = { initGasPriceSaver };
