import cheerio from 'cheerio';
var jsonfile = require('jsonfile');

/**
 * Fetches the webpage we want to scrape. Returns a JSON object which contains
 * arrays of location+price, sorted by company. Prints scrape to JSON file.
 * @param html - the stuff we're going to scrape
 * @param type95 -  true/false.
 *                  True if 95 oktan is being requested.
 *                  False if disel is being requested
 * @returns JSON object
 */
function scrapeGas(html, type95) {

  console.log("í scrape falli og klukkan er: "+ new Date());
  const $ = cheerio.load(html);
  const list = [];
  let file = ''; // variable which stores the name of the JSON file to write to
  let file2 = './server/data/crudeOil.json';
  let sum = 0;
  if (type95) {
    file = './server/data/data95.json';
    // slicing out the first <tr> since that's the headers and we don't need them
    // also, the function isn't allowed to be nameless for some reason...
    // If I use an arrow function, nothing will be scraped!! :(
    $('#okt95').find('tr').slice(1).each(function(i, elem) {
      const elemChildren = $(this).children();
      const pushMe = {
        company: elemChildren.eq(0).text(),
        location: elemChildren.eq(1).text(),
        price: elemChildren.eq(2).text(),
      };
      sum += parseInt(pushMe.price);
      list.push(pushMe);
    });
  } else {
    file = './server/data/dataDiesel.json';
      // slicing out the first <tr> since that's the headers and we don't need them
    $('#disel').find('tr').slice(1).each(function(i, elem) {
      const elemChildren = $(this).children();
      const pushMe = {
        company: elemChildren.eq(0).text(),
        location: elemChildren.eq(1).text(),
        price: elemChildren.eq(2).text(),
      };
      list.push(pushMe);
    });
  }

  const companies = {
    orkan: [],
    dælan: [],
    atlantsolía: [],
    n1: [],
    ob: [],
    olís: [],
    skeljungur: []
  };

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const jsonObj = { location: item.location, price: item.price };

    switch (item.company) {
      case 'Orkan':
        companies.orkan.push(jsonObj);
        break;
      case 'Dælan':
        companies.dælan.push(jsonObj);
        break;
      case 'Atlantsolía':
        companies.atlantsolía.push(jsonObj);
        break;
      case 'ÓB':
        companies.ob.push(jsonObj);
        break;
      case 'N1':
        companies.n1.push(jsonObj);
        break;
      case 'Olís':
        companies.olís.push(jsonObj);
        break;
      case 'Skeljungur':
        companies.skeljungur.push(jsonObj);
        break;
      default: break;
    }
  }

  companies.avg = (sum / list.length).toFixed(2);

  jsonfile.writeFile(file, companies, (err) => {
    //console.error(err)
  });
}

function scrapeBrentOil(html) {
  let file3 = './server/data/html.html';
  jsonfile.writeFile(file3, html, (err) => {
    //console.error(err)
  });
  const $$ = cheerio.load(html);
  let oilObject = {};
  let file = './server/data/crudeOil.json';
  let file2 = './server/data/exchangeRate.json';

  let quoteBar = $$('.mod-tearsheet-overview__quote__bar');
  oilObject.price = quoteBar.children().first().children().last().text();

  let percentage = quoteBar.children().first().next().children().last().text();
  // Doing some string manipulation to retrieve only the percentage part
  let string = percentage.split("/");
  let string2 = string[1].slice(1, string[1].length).split("%");
  oilObject.percentage = string2[0];

  jsonfile.readFile(file2, function(err, data) {
    oilObject.exchangeRate = data;
    jsonfile.writeFile(file, oilObject, (err) => {
      //console.error(err)
    });
  })
}

function saveExchangeRateToFile(data) {
  let file = './server/data/exchangeRate.json';
  jsonfile.writeFile(file, data.results[1].value.toString(), (err) => {
    //console.error(err)
  });
}

module.exports = {
  scrapeGas,
  scrapeBrentOil,
  saveExchangeRateToFile
};
