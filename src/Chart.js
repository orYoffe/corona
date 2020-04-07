import React from 'react';
import {Pie, Bar, Line} from 'react-chartjs-2';
import {View} from 'react-native';

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
const logarithmicConfig = {
  type: 'logarithmic',
  ticks: {
    min: 0.1, //minimum tick
    max: 1000, //maximum tick
    callback: function (value, index, values) {
      return Number(value.toString()); //pass tick values as a string into Number function
    },
  },
  afterBuildTicks: function (chartObj) {
    //Build ticks labelling as per your need
    chartObj.ticks = [];
    chartObj.ticks.push(0.1);
    chartObj.ticks.push(1);
    chartObj.ticks.push(10);
    chartObj.ticks.push(100);
    chartObj.ticks.push(1000);
  },
};

function numberWithCommas(x) {
  const s = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (x > 999) {
    return `${s.slice(0, s.length - 4)}K`;
  }
  return s;
}
export const LineChart = ({data, legend, title, logarithmic}) => {
  const options = {
    title: {
      display: logarithmic || !!title,
      text: logarithmic ? 'Logarithmic chart' : data.datasets[0].label,
      fontSize: 20,
    },
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
    legend: {
      display: !!legend,
      position: 'bottom',
      labels: {
        fontColor: 'white',
        boxWidth: 20,
        padding: 20,
      },
    },
  };
  return (
    <View
      style={{marginTop: 20, height: 450, width: '100%', position: 'relative'}}>
      <Line
        data={data}
        options={logarithmic ? {...logarithmicConfig, ...options} : options}
      />
    </View>
  );
};
export const BarChart = ({data, colors: c}) => {
  data.datasets[0].backgroundColor = c || colors;
  data.datasets[0].hoverBackgroundColor = c || colors;
  return (
    <View
      style={{
        marginTop: 20,
        height: '40vh',
        width: '100%',
        position: 'relative',
      }}>
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

const PieChart = ({data}) => {
  data.datasets[0].backgroundColor = colors;
  data.datasets[0].hoverBackgroundColor = colors;
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
      {/* <PieChart {...props} /> */}
    </>
  );
};
export default Chart;
