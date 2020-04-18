import React, {useEffect, useState, memo} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {useParams, Link} from 'react-router-dom';
import {subscribe} from 'jstates-react';
import {LineChart, BarChart} from './Chart';
import {format, numberWithCommas, Box, L, V} from './utils';
import state from './state';

const RED = '#f00c32';
const GREEN = '#08cf47';
const GREY = '#555';
const redColors = new Array(1000).fill(RED);

const Country = (props) => {
  let {country} = useParams();
  const [barData, setBarData] = useState(null);
  const [dailyInfections, setDailyInfections] = useState(null);
  const [timeData, setTimeData] = useState(null);
  const [data, setCountryData] = useState(null);
  const {countries, time, deaths, recovered} = props;

  useEffect(() => {
    if (!countries || !time || !deaths || !recovered) {
      return;
    }
    const countryDeathTimeData = deaths.countries.find(
      (i) => i.country === country,
    );
    const countryRecoveredTimeData = recovered.countries.find(
      (i) => i.country === country,
    );
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
            // backgroundColor: 'rgba(75,192,192,1)',
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
            // borderColor: GREY,
            // fillColor: GREY,
            // pointColor: GREY,
            // pointStrokeColor: '#fff',
            // pointHighlightFill: '#fff',
            borderWidth: 1,
            data: setsDeath,
          },
          {
            label: 'Recovered',
            backgroundColor: GREEN,
            // borderColor: GREEN,
            // fillColor: GREEN,
            // pointColor: GREEN,
            // pointStrokeColor: '#fff',
            // pointHighlightFill: '#fff',
            borderWidth: 1,
            data: setsRecovered,
          },
          {
            label: 'Confirmed Cases',
            backgroundColor: RED,
            // borderColor: RED,
            // fillColor: RED,
            // pointColor: RED,
            // pointStrokeColor: '#fff',
            // pointHighlightFill: '#fff',
            // fill: false,
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
  }, [country, time, countries, deaths, recovered]);

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

          <View style={{width: '80%', marginBottom: 20}}>
            {!!timeData && <LineChart data={timeData} />}
            {!!dailyInfections && (
              <BarChart data={dailyInfections} colors={redColors} title />
            )}
            {!!barData && (
              <BarChart data={barData} colors={[RED, GREEN, GREY]} />
            )}
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
    backgroundColor: '#222222',
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

export default subscribe(memo(Country), state, (state) => ({
  lastUpdated: state.lastUpdated,
  time: state.time,
  countries: state.countries,
  deaths: state.deaths,
  recovered: state.recovered,
}));
