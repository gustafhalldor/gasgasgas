import express from 'express';
import fs from 'fs';
import router from './routes';

const app = express();

app.set('port', (process.env.PORT || 3001));
app.use('/', router);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/', (req, res) => {
  console.log("hæ frá server!");
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
