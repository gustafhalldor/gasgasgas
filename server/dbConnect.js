const pgp = require('pg-promise')();

const env = process.env.DATABASE_URL;
const db = pgp(env || 'postgres://postgres:gusti@localhost:5432/gasgasgas');

// Create the tables!
function createTables() {
  // Arrival table created.
  db.none(`CREATE TABLE IF NOT EXISTS gasPricesRegular(
            id             SERIAL PRIMARY KEY,
            date           timestamp,
            orkan          float,
            orkanx         float,
            atlantsolía    float,
            ob             float,
            olís           float,
            skeljungur     float,
            n1             float,
            dælan          float
  )`)
  .then(() => {
  })
  .catch((error) => {
  });

  // Departure table created.
  db.none(`CREATE TABLE IF NOT EXISTS brentOil(
            id              SERIAL PRIMARY KEY,
            date            timestamp,
            price           float,
            percentage      float,
            avggas          float
  )`)
  .then(() => {
  })
  .catch((error) => {
  });
}

function saveRegular(obj) {
  db.none(`INSERT INTO gasPricesRegular(date, orkan, orkanx, atlantsolía, ob,
              olís, skeljungur, n1, dælan)
              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [obj.date, obj.orkan, obj.orkanx, obj.atlantsolía, obj.ob, obj.olís, obj.skeljungur,
      obj.n1, obj.dælan])
  .then(() => {
  })
  .catch((error) => {
    console.log("Unable to save Regular to db");
  });
}

function saveOil(obj) {
  db.none(`INSERT INTO brentOil(date, price, percentage, rate, avggas) VALUES($1, $2, $3, $4, $5)`,
    [obj.date, obj.price, obj.percentage, obj.exchangeRate, obj.avg])
  .then(() => {
  })
  .catch((error) => {
    console.log("Unable to save Oil to db");
  });
}

function getRegularPrices(numDays) {
  return db.any(`SELECT * FROM gasPricesRegular
                  WHERE date >= CURRENT_DATE - INTERVAL '$1 DAY'
                  ORDER BY id`, [numDays]);
}

function getAvgGas(numDays) {
  return db.any(`SELECT avg((orkan+orkanx+atlantsolía+ob+olís+skeljungur+n1+dælan)/8)
                  FROM gaspricesregular
                  WHERE date >= CURRENT_DATE - INTERVAL '$1 DAY'`, [numDays]);
}

function getAvgOilAndGas(numDays) {
  return db.any(`SELECT avg(price) AS avgoil, avg((orkan+orkanx+atlantsolía+ob+olís+skeljungur+n1+dælan)/8) AS avggas
                  FROM brentOil b, gasPricesRegular g
                  WHERE b.date >= CURRENT_DATE - INTERVAL '$1 DAY'
                  AND g.date >= CURRENT_DATE - INTERVAL '$1 DAY'`, [numDays]);
}

// ekki að nota
function getOilPrices(numDays) {
  return db.any(`SELECT * FROM brentOil
                  WHERE date >= CURRENT_DATE - INTERVAL '$1 DAY'
                  ORDER BY id`, [numDays]);
}
//
// // ekki að nota
// function getRegularPricesAndOil(numDays) {
//   return db.any(`SELECT g.date, orkan, orkanx, atlantsolía, ob, olís, skeljungur, n1, dælan, price
//                   FROM gasPricesRegular g LEFT OUTER JOIN brentOil ON (g.date = brentOil.date)
//                   WHERE g.date >= CURRENT_DATE - INTERVAL '$1 DAY'
//                   ORDER BY g.date`, [numDays]);
// }
//


module.exports = {
  createTables,
  saveRegular,
  saveOil,
  getRegularPrices,
  getAvgGas,
  getAvgOilAndGas,
  getOilPrices
  // getRegularPricesAndOil,
};
