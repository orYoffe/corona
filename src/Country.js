import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {useParams} from 'react-router-dom';
import {LineChart, BarChart} from './Chart';
import state from './state';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Box = ({children, style}) => (
  <View style={[styles.box, style]}>{children}</View>
);

const L = ({t}) => <Text style={styles.label}>{t}</Text>;
const V = ({t}) => <Text style={styles.value}>{t}</Text>;

const Country = () => {
  let {country} = useParams();
  const [barData, setBarData] = useState(null);
  const [timeData, setTimeData] = useState(null);
  const [data, setCountryData] = useState(null);

  useEffect(() => {
    const {countries, time} = state.state;
    const countryTimeData = time.countries.find((i) => i.country === country);
    const countryData = countries.find((i) => i.country === country);
    if (!countryData) {
      setCountryData(0);
    } else {
      setCountryData(countryData);
      const {confirmed, recovered, deaths} = countryData;
      const barChartData = {
        labels: ['Total', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: country,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [confirmed, recovered, deaths],
          },
        ],
      };
      setBarData(barChartData);
    }
    if (!countryTimeData) {
      setTimeData(0);
    } else {
      const sets = countryTimeData.locations[0].dates.map((i) => {
        const key = Object.keys(i)[0];
        return {y: key, x: i[key]};
      });
      const format = (i) => (i.length < 10 ? `0${i}` : i);
      const lineChartData = {
        labels: sets.map((i) => {
          const d = new Date(i.y);
          const day = d.getDate();
          const month = d.getMonth() + 1;

          return `${format(day)}.${format(month)}`;
        }),
        datasets: [
          {
            label: 'Confirmed Cases',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: sets.map((i) => i.x),
          },
        ],
      };
      setTimeData(lineChartData);
    }
  }, [country]);

  if (data === null) {
    return (
      <ActivityIndicator
        size="large"
        style={{
          marginTop: 40,
          alignSelf: 'center',
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {data === 0 ? (
        <Text style={[styles.title, styles.text]}>
          No country by the name {country} was found
        </Text>
      ) : (
        <>
          <Box
            style={{
              borderBottomColor: '#fff',
              borderBottomStyle: 'solid',
              borderBottomWidth: 1,
            }}>
            <Text style={[styles.title, styles.text]}>{country}</Text>
            <Text key={`Total cases: ${data.confirmed}`} style={styles.text}>
              <L t="Total cases: " />
              <V t={numberWithCommas(data.confirmed)} />
            </Text>
            <Text key={`Total deaths: ${data.deaths}`} style={styles.text}>
              <L t="Total deaths: " />
              <V t={numberWithCommas(data.deaths)} />
            </Text>
            <Text
              key={`Total recovered: ${data.recovered}`}
              style={styles.text}>
              <L t="Total recovered: " />
              <V t={numberWithCommas(data.recovered)} />
            </Text>
            <Text
              key={`updated on: ${state.state.lastUpdated.toDateString()}`}
              style={styles.text}>
              <L t="Updated on: " />
              <V t={state.state.lastUpdated.toDateString()} />
            </Text>
          </Box>
          {!!timeData && (
            <View style={{width: '80%', marginBottom: 20}}>
              <LineChart data={timeData} />
              <BarChart
                data={barData}
                colors={['#ff2222', '#00ff00', '#ccc']}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#282c34',
    alignItems: 'center',
    minHeight: '100%',
    width: '100%',
  },
  box: {
    margin: 10,
    padding: 10,
    width: '80%',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#fff',
    marginBottom: 5,
  },
  country: {
    width: '100%',
    marginBottom: 10,
    borderBottomColor: '#fff',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
  },
  label: {
    color: '#ddd',
  },
  Value: {
    color: '#fff',
  },
});

export default Country;
