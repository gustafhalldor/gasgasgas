const axios = require('axios');

const baseURL = (process.env.baseURL || 'http://bensinverd.is/gsmbensin_web.php');
const instance = axios.create({ baseURL });
const instance2 = axios.create({ baseURL: `https://markets.ft.com/data/commodities/tearsheet/summary?c=Brent+Crude+Oil` });
const instance3 = axios.create({ baseURL: `https://www.apis.is//currency/lb` });

/**
 * Fetches the webpage we want to scrape. Returns a promise that when
 * resolved returns an array.
 * @returns {Promise}
 */
function gasPrices() {
  return instance.get(baseURL);
}

function crudeOilPrice() {
  return instance2.get(`https://markets.ft.com/data/commodities/tearsheet/summary?c=Brent+Crude+Oil`);
}

function exchangeRate() {
  return instance3.get(`https://www.apis.is/currency/lb`);
}

module.exports = {
  gasPrices,
  crudeOilPrice,
  exchangeRate
};
