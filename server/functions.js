const scheduler = require('node-schedule');

const priceList = require('./prices');
const scraper = require('./scraper');

let timerShouldRun = true;

function setTimer() {
  if (timerShouldRun) {
    console.log("initial scrape og set timer í gang");
    // Fetching prices once at server startup
    priceList.gasPrices()
      .then((result) => {
        // result.data is a string containing the HTML
        scraper.scrape(result.data, true);
        scraper.scrape(result.data, false);
        console.log("búinn með initial scrape");
      })
     .catch((error) => {
     });

    // Creating a recurring rule for scraping
    const rule = new scheduler.RecurrenceRule();
    rule.dayOfWeek = [new scheduler.Range(0, 6)];  // runs every day of the week
    // runs at 4 hour intervals over the day and on these hours
    rule.hour = [0, 4, 8, 12, 16, 20];
    rule.minute = 0;
    scheduler.scheduleJob(rule, () => {
      priceList.gasPrices()
        .then((result) => {
          // result.data is a string containing the HTML
          scraper.scrape(result.data, true);
          scraper.scrape(result.data, false);
        })
       .catch((error) => {
       });
    });
  }
  timerShouldRun = false;
}

module.exports = {
  setTimer,
};
