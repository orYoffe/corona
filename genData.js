/* eslint-disable import/first */
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
  const filePath = path.resolve('./build/index.html');
  const data = fs.readFileSync(filePath, 'utf8');
  fs.writeFileSync(
    filePath,
    data.replace(
      '</head>',
      `<script>window.__j__ = ${JSON.stringify(
        j,
      )}window.__d__ = ${JSON.stringify(d)}</script></head>`,
    ),
    'utf8',
  );
});
