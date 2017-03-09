const axios = require('axios');

const baseURL = (process.env.baseURL || 'http://bensinverd.is/gsmbensin_web.php');
const instance = axios.create({ baseURL });
const instance2 = axios.create({ baseURL: `https://www.plus500.com/Instruments/EB` });

/**
 * Fetches the webpage we want to scrape. Returns a promise that when
 * resolved returns an array.
 * @returns {Promise}
 */
function gasPrices() {
  return instance.get(baseURL);
}

function crudeOilPrice() {
  return instance2.get(`https://www.plus500.com/Instruments/EB`);
}

module.exports = {
  gasPrices,
  crudeOilPrice
};
