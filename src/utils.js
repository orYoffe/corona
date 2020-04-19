import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {white} from './colors';

export const chartList = {
  Cases: 'confirmed',
  'Active cases': 'active',
  Recovered: 'recovered',
  Deaths: 'deaths',
  'Population infected': 'precentage',
};

export const generateBarData = (countries, sort = 'confirmed') => {
  const top10 = countries.sort((a, b) => b[sort] - a[sort]).slice(0, 9);

  const labels = top10.map((i) => i.country);
  const data = top10.map((i) => i[sort]);
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Cases per country',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data,
      },
    ],
  };

  return chartData;
};

export const format = (i) => (i < 10 ? `0${i}` : i);
export const colors = [
  '#ff0029',
  '#377eb8',
  '#7f80cd',
  '#66a61e',
  '#984ea3',
  '#00d2d5',
  '#ff7f00',
  '#af8d00',
  '#b3e900',
  '#fec254',
  '#ccebc5',
  '#a63603',
  '#016c59',
  '#e7298a',
  '#c994c7',
  '#dfdf00',
  '#df00df',
  '#80ff80',
];

export const Box = memo(({children, style}) => (
  <View
    style={[
      {
        width: '90%',
      },
      style,
    ]}>
    {children}
  </View>
));

export const L = memo(({t}) => (
  <Text
    style={{
      color: '#ddd',
    }}>
    {t}
  </Text>
));
export const V = memo(({t}) => (
  <Text
    style={{
      color: white,
    }}>
    {t}
  </Text>
));

export function numberWithCommas(x, shouldRound) {
  const s = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (shouldRound && x > 999) {
    let decimal = '';
    if (x < 2000 && s.length > 4 && s.slice(-3) !== '000') {
      decimal = `.${s.slice(-3)[0]}`;
    }

    return `${s.slice(0, s.length - 4)}${decimal}K`;
  }
  return s;
}
