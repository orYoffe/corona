import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {getData, getTimeSeriesData} from './jsu';
import {parseData, parseTimeData} from './initData';
import state from './state';

if (window.__j__ && window.__d__) {
  parseData(window.__d__, window.__j__);
}
Promise.all([
  getData(),
  fetch(
    'https://data.opendatasoft.com/api/records/1.0/search/?dataset=world-population%40kapsarc&rows=10000&sort=year&facet=year&facet=country_name',
  ).then((j) => j.json()),
]).then(([d, j]) => {
  console.log('--¯_(ツ)_/¯-----------d----------', d);
  console.log('--¯_(ツ)_/¯-----------j----------', j);
  parseData(d, j);
});

getTimeSeriesData('confirmed').then(parseTimeData);
getTimeSeriesData('deaths').then((deaths) => {
  console.log('--¯_(ツ)_/¯-----------deaths----------', deaths);
  state.setState({deaths});
});
getTimeSeriesData('recovered').then((recovered) => {
  console.log('--¯_(ツ)_/¯-----------recovered----------', recovered);
  state.setState({recovered});
});
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
