import React from 'react';
import {Pie, Bar, Line} from 'react-chartjs-2';
import {View} from 'react-native';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const LineChart = ({data, legend}) => {
  return (
    <View
      style={{marginTop: 20, height: 450, width: '100%', position: 'relative'}}>
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: function (value, index, values) {
                    return numberWithCommas(value);
                  },
                },
              },
            ],
          },
          title: {
            display: false,
            fontSize: 20,
          },
          legend: {
            display: !!legend,
            position: 'bottom',
            labels: {
              fontColor: 'white',
              boxWidth: 20,
              padding: 20,
            },
          },
        }}
      />
    </View>
  );
};
export const BarChart = ({data, colors}) => {
  data.datasets[0].backgroundColor = colors;
  data.datasets[0].hoverBackgroundColor = colors || [
    '#501800',
    '#4B5000',
    '#175000',
    '#003350',
    '#35014F',
  ];
  return (
    <View
      style={{marginTop: 20, height: 450, width: '100%', position: 'relative'}}>
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function (value, index, values) {
                    return numberWithCommas(value);
                  },
                },
              },
            ],
          },
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
export const colors = [
  '#000294',
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
