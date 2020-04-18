require('universal-fetch');
import fs from 'fs';
import path from 'path';
import {getData} from './src/jsu';

Promise.all([
  getData(),
  fetch(
    'https://data.opendatasoft.com/api/records/1.0/search/?dataset=world-population%40kapsarc&rows=10000&sort=year&facet=year&facet=country_name',
  ).then((j) => j.json()),
]).then(([d, j]) => {
  console.log('--¯_(ツ)_/¯-----------d----------', d);
  console.log('--¯_(ツ)_/¯-----------j----------', j);
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    }
    data.replace(
      '<div id="root"></div>',
      `<script>window.__j__ = ${JSON.stringify(
        j,
      )}window.__d__ = ${JSON.stringify(d)}</script><div id="root"></div>`,
    );
  });
});
