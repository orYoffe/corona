import React, {memo} from 'react';
import {View} from 'react-native';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {numberWithCommas, colors} from './utils';

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
export const LineChart = memo(({data, legend, title, logarithmic}) => {
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
              return numberWithCommas(value, true);
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
});
export const BarChart = memo(({data, colors: c, title}) => {
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
                    return numberWithCommas(value, true);
                  },
                },
              },
            ],
          },
          title: {
            display: !!title,
            text: data.datasets[0].label,
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
});

export const PieChart = memo(({data}) => {
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
});
const Chart = (props) => {
  return (
    <>
      <BarChart {...props} />
      {/* <PieChart {...props} /> */}
    </>
  );
};
export default Chart;
