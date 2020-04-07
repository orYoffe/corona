const path = require('path');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
// const Covid19 = require('./src/jsu');

// const covid19 = new Covid19();

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

const app = express();
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'test';

if (process.env.NODE_ENV !== 'production') {
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );

    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type',
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });
}
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());

// app.post('/api/data', (req, res) => {
//   return Promise.all([
//     covid19.getData(),
//     covid19.getTimeSeriesData('confirmed'),
//   ]).then(([d, time]) => {
//     res.json({d, time});
//   });
// });

app.use(function (req, res, next) {
  if (req.url.match(/^\/(css|js|img|font)\/.+/)) {
    res.setHeader('Cache-Control', 'build, max-age=3600');
  }
  next();
});

app.use(express.static(path.resolve(__dirname, './build')));

app.get('/*', function (req, res) {
  res.redirect(301, 'https://oryoffe.github.io/corona/');
  // res.sendFile(path.resolve(__dirname, './build/index.html'));
});

const server = app.listen(port, function () {
  console.log(
    '\n\nCORONA Web Server --- ' +
      env +
      ' environment, is now running on http://localhost:' +
      port +
      ' .\n',
  );
});
