const axios = require('axios');

const baseURL = (process.env.baseURL || 'http://bensinverd.is/gsmbensin_web.php');
const instance = axios.create({ baseURL });

/**
 * Fetches the webpage we want to scrape. Returns a promise that when
 * resolved returns an array.
 * @returns {Promise}
 */
function gasPrices() {
  return instance.get(baseURL);
}

module.exports = {
  gasPrices,
};
