import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {useParams, Link} from 'react-router-dom';
import {subscribe} from 'jstates-react';
import {LineChart, BarChart} from './Chart';
import {format, numberWithCommas, Box, L, V} from './utils';
import state from './state';

const redColors = new Array(1000).fill('#f00c32');

const Country = (props) => {
  let {country} = useParams();
  const [barData, setBarData] = useState(null);
  const [dailyInfections, setDailyInfections] = useState(null);
  const [timeData, setTimeData] = useState(null);
  const [data, setCountryData] = useState(null);

  useEffect(() => {
    const {countries, time} = state.getState();
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
      const sets = countryTimeData.locations[0].dates.map((i, index) => {
        let total = 0;
        const time = Object.keys(i)[0];
        countryTimeData.locations.forEach((location) => {
          total += location.dates[index][time];
        });
        return {y: time, x: total};
      });
      const labels = sets.map((i) => {
        const d = new Date(i.y.replace(/-/g, '/'));
        const day = d.getDate();
        const month = d.getMonth() + 1;

        return `${format(day)}.${format(month)}`;
      });
      const lineChartData = {
        labels,
        datasets: [
          {
            label: 'Confirmed Cases',
            backgroundColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            data: sets.map((i) => i.x),
          },
        ],
      };
      setTimeData(lineChartData);
      const daily = sets.map(
        (i, index) =>
          parseInt(i.x) - parseInt((sets[index - 1] && sets[index - 1].x) || 0),
      );
      const dailyInfectionsData = {
        labels: labels.slice(1),
        datasets: [
          {
            label: 'Daily Cases',
            backgroundColor: '#d45757',
            borderWidth: 2,
            data: daily.slice(1),
          },
        ],
      };
      setDailyInfections(dailyInfectionsData);
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
      <Link to="/">
        <Text
          style={[
            styles.button,
            styles.buttonText,
            {
              padding: 10,
              width: '100%',
              lineHeight: 35,
            },
          ]}>
          Go to main page
        </Text>
      </Link>
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
            {!!data.population && (
              <Text key={`population: ${data.population}`} style={styles.text}>
                <L t="Population: " />
                <V t={numberWithCommas(data.population)} />
              </Text>
            )}
            {!!data.precentage && (
              <Text key={`population: ${data.precentage}`} style={styles.text}>
                <L t="Population infected: " />
                <V t={data.precentage + '%'} />
              </Text>
            )}
            <Text
              key={`updated on: ${props.lastUpdated.toDateString()}`}
              style={styles.text}>
              <L t="Updated on: " />
              <V t={props.lastUpdated.toDateString()} />
            </Text>
          </Box>
          {!!timeData && (
            <View style={{width: '80%', marginBottom: 20}}>
              <LineChart data={timeData} title />
              {dailyInfections && (
                <BarChart data={dailyInfections} colors={redColors} title />
              )}
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
    alignItems: 'center',
    minHeight: '100%',
    width: '100%',
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
  button: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: '#1B95E0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default subscribe(Country, state, (state) => ({
  lastUpdated: state.lastUpdated,
}));
