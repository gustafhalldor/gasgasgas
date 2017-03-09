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
    skeljungur: [],
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

  jsonfile.writeFile(file, companies, (err) => {
    //console.error(err)
  });
}

function scrapeBrentOil(html) {
  const $$ = cheerio.load(html);
  let oilObject = {};
  let file = './server/data/crudeOil.json';
  oilObject.price = $$('#ctl00_ContentPlaceMain1_LabelBuyPriceBig').text();
  oilObject.percentage = $$('#ctl00_ContentPlaceMain1_LabelPercentage').text();

  jsonfile.writeFile(file, oilObject, (err) => {
    //console.error(err)
  });
}

module.exports = {
  scrapeGas,
  scrapeBrentOil
};
