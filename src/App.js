import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import {subscribe} from 'jstates-react';
import Country from './Country';
import Home from './Home';
import {colors, format, numberWithCommas} from './Chart';
import state from './state';

const Covid19 = require('./jsu');
const covid19 = new Covid19();

class App extends Component {
  async componentDidMount() {
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
    const countries = d.countries.map((country) => {
      const countryPopulations = j.records.filter((i) => {
        const countryName = i.fields.country_name;
        return (
          countryName.toLowerCase() === country.country.toLowerCase() ||
          countryName === countryNamesExceptions[country.country]
        );
      });

      if (!countryPopulations.length) {
        return country;
      }
      const countryPopulation = countryPopulations.sort(
        (a, b) => b.fields.year - a.fields.year,
      )[0];
      if (!countryPopulation || !countryPopulation.fields.value) {
        return country;
      }
      const newCountry = {
        ...country,
        population: countryPopulation.fields.value,
      };
      const perc = (
        (country.confirmed / countryPopulation.fields.value) *
        100
      ).toFixed(2);
      if (perc + '' !== '0.00') {
        newCountry.precentage = perc;
      }
      return newCountry;
    });

    const top10 = countries
      .sort((a, b) => b.confirmed - a.confirmed)
      .slice(0, 6);

    const labels = top10.map((i) => i.country);
    const data = top10.map((i) => i.confirmed);
    const chartData = {
      labels,
      datasets: [
        {
          label: 'Cases per country',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data,
        },
      ],
    };
    const lineChartData = {
      labels: [],
      datasets: [],
    };
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
        label: countryTimeData.country,
        borderColor: colors[index],
        fill: false,
        borderWidth: 1,
        data: sets.map((i) => i.x),
      });
    });
    state.setState({
      lastUpdated: new Date(d.date.replace(/-/g, '/')),
      allCases: numberWithCommas(d.confirmed),
      allDeaths: numberWithCommas(d.deaths),
      allRecovered: numberWithCommas(d.recovered),
      countries,
      filteredCountries: countries,
      chartData,
      time,
      lineChartData,
    });
  }

  render() {
    const {lastUpdated} = state.state;

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
                {color: '#aaa', padding: 10, width: '100%'},
              ]}>
              COVID-19 data provided by Johns Hopkins CSSE
            </Text>
            {!lastUpdated ? (
              <ActivityIndicator
                size="large"
                style={{
                  marginTop: 40,
                  alignSelf: 'center',
                }}
              />
            ) : (
              <>
                <Link to="/">
                  <Text
                    style={[
                      styles.title,
                      {
                        color: '#fff',
                        padding: 10,
                        width: '100%',
                        backgroundColor: '#00429d',
                        lineHeight: 35,
                      },
                    ]}>
                    Go Back Home
                  </Text>
                </Link>

                <Switch>
                  <Route path="/country/:country">
                    <Country />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                  <Redirect to="/" />
                </Switch>
              </>
            )}
          </View>
        </ScrollView>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#282c34',
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

export default subscribe(App, [state]);
