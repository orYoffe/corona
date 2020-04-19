import React, {memo, Suspense} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {subscribe} from 'jstates-react';
import state, {chartState, timeState} from '../state';
import DropDown from './DropDown';
import {generateBarData, chartList} from '../utils';

const Chart = React.lazy(() => import('./Chart'));
const LineChart = React.lazy(() =>
  import('./Chart').then((module) => ({
    default: module.LineChart,
  })),
);

const setNewChartData = (sort = 'confirmed') => {
  const chartData = generateBarData(
    state.getState().countries.slice(0),
    chartList[sort],
  );

  chartState.setState({chartData});
};
const Charts = ({chartData, lineChartData}) => {
  return (
    <View style={styles.container}>
      <DropDown
        options={chartList}
        onSelect={setNewChartData}
        label="Select chart data"
      />

      {chartData && (
        <Suspense
          fallback={<ActivityIndicator size="large" style={styles.loader} />}>
          <Chart data={chartData} />
        </Suspense>
      )}
      {lineChartData && (
        <Suspense fallback="">
          <LineChart data={lineChartData} legend />
        </Suspense>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginTop: 40,
    height: 200,
    alignSelf: 'center',
  },
});
const HomeCharts = subscribe(
  memo(Charts),
  [chartState, timeState],
  (chartState, timeState) => ({
    lineChartData: timeState.lineChartData,
    chartData: chartState.chartData,
  }),
);

export default HomeCharts;
