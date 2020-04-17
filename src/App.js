import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Country from './Country';
import Home from './Home';
import {generateBarData, numberWithCommas, colors, format} from './utils';
import state from './state';
import dailyData from './d';
import populationData from './j';
import timeConfirmedData from './time';

const Covid19 = require('./jsu');
const covid19 = new Covid19();

// const saveToLocalStorage = (obj) => {
//   Object.keys(obj).forEach((key) => {
//     console.log('--¯_(ツ)_/¯-----------key----------', key);
//     localStorage.setItem(key, JSON.stringify(obj[key]));
//   });
// };

const getLineChartData = (timeCountries) => {
  const lineChartData = {
    labels: [],
    datasets: [],
  };

  timeCountries.forEach((countryTimeData, index) => {
    const sets = countryTimeData.locations[0].dates.map((i, index) => {
      let total = 0;
      const time = Object.keys(i)[0];
      countryTimeData.locations.forEach((location) => {
        total += location.dates[index][time];
      });
      return {y: time, x: total};
    });
    if (lineChartData.labels.length < 1) {
      lineChartData.labels = sets.map((i) => {
        const d = new Date(i.y.replace(/-/g, '/'));
        const day = d.getDate();
        const month = d.getMonth() + 1;

        return `${format(day)}.${format(month)}`;
      });
    }
    lineChartData.datasets.push({
      label: countryTimeData.country.slice(0),
      borderColor: colors[index].slice(0),
      fill: false,
      borderWidth: 1,
      data: sets.map((i) => i.x),
    });
  });

  return lineChartData;
};

const countryNamesExceptions = {
  US: 'United States',
  Iran: 'Iran, Islamic Rep.',
  Russia: 'Russian Federation',
  'Korea, South': 'Korea, Rep.',
  Czechia: 'Czech Republic',
  Egypt: 'Egypt, Arab Rep.',
  Slovakia: 'Slovak Republic',
  Kyrgyzstan: 'Kyrgyz Republic',
  Venezuela: 'Venezuela, RB',
  Brunei: 'Brunei Darussalam',
  Gambia: 'Gambia, The',
};

class App extends PureComponent {
  parseData = (d, time, j) => {
    const countries = d.countries.map((country) => {
      const newCountry = {
        ...country,
        active: country.confirmed - (country.recovered + country.deaths),
      };

      const countryPopulations = j.records.filter((i) => {
        const countryName = i.fields.country_name;
        return (
          countryName.toLowerCase() === country.country.toLowerCase() ||
          countryName === countryNamesExceptions[country.country]
        );
      });

      if (!countryPopulations.length) {
        return newCountry;
      }

      const countryPopulation = countryPopulations.sort(
        (a, b) => b.fields.year - a.fields.year,
      )[0];

      if (!countryPopulation || !countryPopulation.fields.value) {
        return newCountry;
      }

      newCountry.population = countryPopulation.fields.value;
      const perc = (
        (country.confirmed / countryPopulation.fields.value) *
        100
      ).toFixed(2);

      if (perc + '' !== '0.00') {
        newCountry.precentage = perc;
      }

      return newCountry;
    });

    const timeCountries = time.countries
      .sort((a, b) => {
        let aTotal = 0;
        let bTotal = 0;
        a.locations.forEach((l) => {
          aTotal += l.total;
        });
        b.locations.forEach((l) => {
          bTotal += l.total;
        });

        return bTotal - aTotal;
      })
      .slice(0, 10);
    const chartData = generateBarData(countries.slice(0));
    const lineChartData = getLineChartData(timeCountries);

    const newState = {
      lastUpdated: new Date(d.date.replace(/-/g, '/')),
      allCases: numberWithCommas(d.confirmed),
      allDeaths: numberWithCommas(d.deaths),
      allRecovered: numberWithCommas(d.recovered),
      countries,
      filteredCountries: countries.slice(0),
      chartData,
      time,
      lineChartData,
    };
    state.setState(newState);
    // saveToLocalStorage({d, time, j});
  };
  async componentDidMount() {
    this.parseData(dailyData, timeConfirmedData, populationData);
    const [d, time, j] = await Promise.all([
      covid19.getData(),
      covid19.getTimeSeriesData('confirmed'),
      fetch(
        'https://data.opendatasoft.com/api/records/1.0/search/?dataset=world-population%40kapsarc&rows=10000&sort=year&facet=year&facet=country_name',
      ).then((j) => j.json()),
    ]);
    console.log('--¯_(ツ)_/¯-----------d----------', d);
    console.log('--¯_(ツ)_/¯-----------time----------', time);
    console.log('--¯_(ツ)_/¯-----------j----------', j);

    this.parseData(d, time, j);
  }

  render() {
    return (
      <Router basename="/corona">
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.container}>
            <Text
              accessibilityRole="link"
              target="_blank"
              href="https://github.com/CSSEGISandData/COVID-19"
              style={[
                styles.title,
                {
                  color: '#aaa',
                  padding: 10,
                  width: '100%',
                  textAlign: 'center',
                },
              ]}>
              COVID-19 data provided by Johns Hopkins CSSE
            </Text>
            <Switch>
              <Route path="/country/:country">
                <Country />
              </Route>
              <Route path="/">
                <Home />
              </Route>
              <Redirect to="/" />
            </Switch>
          </View>
        </ScrollView>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222222',
    alignItems: 'center',
    minHeight: '100%',
    width: '100%',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
