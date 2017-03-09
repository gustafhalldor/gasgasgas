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
        scraper.scrapeGas(result.data, true);
        scraper.scrapeGas(result.data, false);
        console.log("búinn með initial scrape");
      })
     .catch((error) => {
     });

    priceList.crudeOilPrice()
      .then((result) => {
        scraper.scrapeBrentOil(result.data);
      })
     .catch((error) => {
     });

    // Creating a recurring rule for scraping
    const rule = new scheduler.RecurrenceRule();
    rule.dayOfWeek = [new scheduler.Range(0, 6)];
    rule.minute = [59, 29];
    // runs on 30 min intervals every day of the week
    scheduler.scheduleJob(rule, () => {
      priceList.gasPrices()
        .then((result) => {
          scraper.scrapeGas(result.data, true);
          scraper.scrapeGas(result.data, false);
        })
        .catch((error) => {
        });

      priceList.crudeOilPrice()
        .then((result) => {
          console.log("búinn að ná í htmlið og er að senda yfir í scraper");
          scraper.scrapeBrentOil(result.data);
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
