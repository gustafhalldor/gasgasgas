
const db = require('./dbConnect');
const scheduler = require('node-schedule');
import jsonfile from 'jsonfile';

function initGasPriceSaver() {
  // Creating a recurring rule for saving to db
  const rule = new scheduler.RecurrenceRule();
  rule.dayOfWeek = [new scheduler.Range(0, 6)];
  // runs at 30 min intervals, every day of the week
  rule.minute = [0, 30];
  const file = './server/data/data95.json';
  const file2 = './server/data/crudeOil.json';
  scheduler.scheduleJob(rule, () => {
    jsonfile.readFile(file, function(err, data) {
      let regularGasObject = getRegularPrice(data);
      db.saveRegular(regularGasObject);
    })

    jsonfile.readFile(file2, function(err, data) {
      let oilObject = getOilPrice(data);
      db.saveOil(oilObject);
    })
  });
}

function getOilPrice(dataOil) {
  let object = {};

  object.date = getDateTime(); //yyyy-mm-dd hh:mm
  object.price = dataOil.price;
  object.percentage = dataOil.percentage.slice(0, 5);

  return object;
}

function getRegularPrice(data95) {
  let object = {};

  object.date = getDateTime(); //yyyy-mm-dd hh:mm
  object.orkan = data95.orkan[4].price;
  object.orkanx = data95.orkan[0].price;
  object.dælan = data95.dælan[0].price;
  object.atlantsolía = data95.atlantsolía[1].price;
  object.n1 = data95.n1[0].price;
  object.ob = data95.ob[0].price;
  object.olís = data95.olís[0].price;
  object.skeljungur = data95.skeljungur[0].price;

  return object;
}

function getDateTime() {
  const currentdate = new Date();

  let day = currentdate.getDate();
  let month = currentdate.getMonth()+1;
  let year = currentdate.getFullYear();
  let hours = currentdate.getHours();
  let minutes = currentdate.getMinutes();

  // Add zero to segment if it is only 1 character, f.ex. 1 second should be 01 second.
  // Having 'year' in the array is redundant, but I'm keeping it there for clarity's sake.
  let arr = [year, month, day, hours, minutes];
  for (var i = 0; i < arr.length; i++) {
    if(arr[i].toString().length === 1) {
      arr[i] = '0' + arr[i];
    }
  }

  // dd-mm-yyyy hh:mm
  const datetime = arr[0] + "-"
                 + arr[1] + "-"
                 + arr[2] + " "
                 + arr[3] + ":"
                 + arr[4];
  return datetime;
}

module.exports = { initGasPriceSaver };
