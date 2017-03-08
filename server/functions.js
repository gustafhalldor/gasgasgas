const scheduler = require('node-schedule');

const priceList = require('./prices');
const scraper = require('./scraper');

let timerShouldRun = true;

function setScrapeTimer() {
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
    //rule.hour = [0, 4, 8, 9, 10, 11, 12, 16, 20];
    rule.minute = [50, 20];
    scheduler.scheduleJob(rule, () => {
      console.log("er í efra scrape timer og klukkan er: "+ new Date());
      priceList.gasPrices()
        .then((result) => {
          console.log("er í scrape timer og klukkan er: "+ new Date());
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
  setScrapeTimer,
};
