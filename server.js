const path = require('path');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'test';

app.use(helmet());
app.use(morgan('dev'));
app.use(compression());

app.use(function(req, res, next) {
  if (req.url.match(/^\/(css|js|img|font)\/.+/)) {
    res.setHeader('Cache-Control', 'build, max-age=3600');
  }
  next();
});

app.use(express.static(path.resolve(__dirname, '../build')));

app.use('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

const server = app.listen(port, function() {
  console.log(
    '\n\nCORONA Web Server --- ' +
      env +
      ' environment, is now running on http://localhost:' +
      port +
      ' .\n',
  );
});
