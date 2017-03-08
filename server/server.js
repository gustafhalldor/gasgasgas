import express from 'express';
import fs from 'fs';
import path from 'path';
const db = require('./dbConnect');
const router = require('./routes');
const app = express();
const scheduler = require('./functions'); // for scheduling scrape calls
import saver from './gasPriceSaver.js';
const cors = require('cors');

app.use(cors());

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
app.use('/api', router);
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(app.get('port'), () => {
  db.createTables();  // færa kannski  yfir í listener fallið
  scheduler.setScrapeTimer();
  saver.initGasPriceSaver();
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
