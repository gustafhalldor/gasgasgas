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
  db.none(`CREATE TABLE IF NOT EXISTS worldPrice(
            id              SERIAL PRIMARY KEY,
            date            timestamp,
            iceAvg          float,
            oilBarrel       float,
            gasWorld        float
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
    console.log("Unable to save to db");
  });
}

function getRegularPrices(numDays) {
  return db.any(`SELECT * FROM gasPricesRegular
                  WHERE date >= CURRENT_DATE - INTERVAL '$1 DAY'`, [numDays]);
}

function checkIfAlreadySaved(dateCheck) {
  return db.any(`SELECT * FROM gasPricesRegular
                  WHERE date = $1`, [dateCheck]);
}


module.exports = {
  createTables,
  saveRegular,
  getRegularPrices,
  checkIfAlreadySaved
};
