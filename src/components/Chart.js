import React, {memo} from 'react';
import {View} from 'react-native';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {numberWithCommas, colors} from '../utils';

export const LineChart = memo(({data, legend, title}) => {
  const options = {
    title: {
      display: !!title,
      text: data.datasets[0].label,
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
      <Line data={data} options={options} />
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
                  beginAtZero: true,
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
