import React, {useEffect, useState, memo} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {useParams, Link} from 'react-router-dom';
import {subscribe} from 'jstates-react';
import {LineChart, BarChart} from './Chart';
import {format, numberWithCommas, Box, L, V} from '../utils';
import state, {timeState, countryState} from '../state';
import {white, black} from '../colors';
import FavButton from './FavButton';

const RED = '#f00c32';
const GREEN = '#08cf47';
const GREY = '#555';
const redColors = new Array(1000).fill(RED);

const CountryBarChart = memo(({confirmed, recovered, deaths, country}) => {
  const barData = {
    labels: ['Total', 'Recovered', 'Deaths'],
    datasets: [
      {
        label: country,
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [confirmed, recovered, deaths],
      },
    ],
  };
  return <BarChart data={barData} colors={[RED, GREEN, GREY]} />;
});

const Country = (props) => {
  let {country} = useParams();
  const [dailyInfections, setDailyInfections] = useState(null);
  const [timeData, setTimeData] = useState(null);
  const [data, setCountryData] = useState(null);
  const {countries, time, deaths, recovered} = props;

  useEffect(() => {
    if (!countries || data) {
      return;
    }
    const countryData = countries.find((i) => i.country === country);
    if (!countryData) {
      setCountryData(0);
    } else {
      setCountryData(countryData);
    }
  }, [country, countries, data]);

  useEffect(() => {
    if (!time || !deaths || !recovered || timeData || dailyInfections) {
      return;
    }
    const countryDeathTimeData = deaths.countries.find(
      (i) => i.country === country,
    );
    const countryRecoveredTimeData = recovered.countries.find(
      (i) => i.country === country,
    );
    const countryTimeData = time.countries.find((i) => i.country === country);
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
      const setsDeath = countryDeathTimeData.locations[0].dates.map(
        (i, index) => {
          let total = 0;
          const time = Object.keys(i)[0];
          countryDeathTimeData.locations.forEach((location) => {
            total += location.dates[index][time];
          });
          return total;
        },
      );
      const setsRecovered = countryRecoveredTimeData.locations[0].dates.map(
        (i, index) => {
          let total = 0;
          const time = Object.keys(i)[0];
          countryRecoveredTimeData.locations.forEach((location) => {
            total += location.dates[index][time];
          });
          return total;
        },
      );
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
            label: 'Deaths',
            backgroundColor: GREY,
            borderWidth: 1,
            data: setsDeath,
          },
          {
            label: 'Recovered',
            backgroundColor: GREEN,
            borderWidth: 1,
            data: setsRecovered,
          },
          {
            label: 'Confirmed Cases',
            backgroundColor: RED,
            borderWidth: 1,
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
  }, [country, time, deaths, recovered, timeData, dailyInfections]);

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
      <FavButton country={country} />
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
              borderBottomColor: white,
              borderBottomStyle: 'solid',
              borderBottomWidth: 1,
            }}>
            <Text style={[styles.title, styles.text]}>{country}</Text>
            <Text key={`Total cases: ${data.confirmed}`} style={styles.text}>
              <L t="Total cases: " />
              <V t={numberWithCommas(data.confirmed)} />
            </Text>
            <Text key={`Total active: ${data.active}`} style={styles.text}>
              <L t="Total active: " />
              <V t={numberWithCommas(data.active)} />
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

          <View style={{width: '90%', marginBottom: 20}}>
            {!!timeData && <LineChart data={timeData} />}
            {!!dailyInfections && (
              <BarChart data={dailyInfections} colors={redColors} title />
            )}
            {!!data && <CountryBarChart {...data} />}
          </View>
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
    backgroundColor: black,
  },
  title: {
    color: white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: white,
    marginBottom: 5,
  },
  country: {
    width: '100%',
    marginBottom: 10,
    borderBottomColor: white,
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
    color: white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default subscribe(
  memo(Country),
  [state, timeState, countryState],
  (state, timeState, countryState) => ({
    lastUpdated: state.lastUpdated,
    time: timeState.time,
    countries: state.countries,
    deaths: countryState.deaths,
    recovered: countryState.recovered,
  }),
);
