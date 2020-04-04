import React from 'react';
import {Pie, Doughnut, Bar, Line} from 'react-chartjs-2';
import {View} from 'react-native';

export const LineChart = ({data}) => {
  return (
    <View style={{width: '100%'}}>
      <Line
        data={data}
        options={{
          title: {
            display: false,
            // text: data.datasets[0].label,
            fontSize: 20,
          },
          legend: {
            display: false,
            position: 'right',
          },
        }}
      />
    </View>
  );
};
const BarChart = ({data}) => {
  return (
    <View style={{width: '100%'}}>
      <Bar
        data={data}
        options={{
          title: {
            display: false,
            // text: data.datasets[0].label,
            fontSize: 20,
          },
          legend: {
            display: false,
            position: 'right',
          },
        }}
      />
    </View>
  );
};
const colors = [
  '#00429d',
  '#2e59a8',
  '#4771b2',
  '#5d8abd',
  '#73a2c6',
  '#8abccf',
  '#a5d5d8',
  '#c5eddf',
  '#ffffe0',
];
// const colors = [];
// while (colors.length < 100) {
//   let color;
//   do {
//     color = Math.floor(Math.random() * 100000000 + 1);
//   } while (colors.indexOf(color) >= 0);
//   colors.push('#' + ('000000' + color.toString(16)).slice(-6));
// }
const PieChart = ({data}) => {
  data.datasets[0].backgroundColor = colors;
  data.datasets[0].hoverBackgroundColor = [
    '#501800',
    '#4B5000',
    '#175000',
    '#003350',
    '#35014F',
  ];
  return (
    <View style={{width: '100%'}}>
      <Pie
        data={data}
        options={{
          title: {
            display: false,
            text: data.datasets[0].label,
            fontSize: 16,
          },
          legend: {
            display: false,
          },
          // legend: {
          //   display: true,
          //   position: 'right',
          // },
        }}
      />
      {/* 
      <Doughnut
        data={data}
        options={{
          title: {
            display: true,
            text: 'Corona cases per country',
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'right',
          },
        }}
      /> */}
    </View>
  );
};
const Chart = (props) => {
  return (
    <>
      <BarChart {...props} />
      <PieChart {...props} />
    </>
  );
};
export default Chart;
