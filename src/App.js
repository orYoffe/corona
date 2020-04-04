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
import Home from './Home';
import Country from './Country';
import getData from './api';
import state from './state';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

class App extends Component {
  async componentDidMount() {
    const {d, time} = await getData();
    console.log('--¯_(ツ)_/¯-----------d----------', d);
    console.log('--¯_(ツ)_/¯-----------time----------', time);

    const countries = d.countries;

    const top10 = countries
      .sort((a, b) => b.confirmed - a.confirmed)
      .slice(0, 9);

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

    state.setState({
      lastUpdated: new Date(d.date),
      allCases: numberWithCommas(d.confirmed),
      allDeaths: numberWithCommas(d.deaths),
      allRecovered: numberWithCommas(d.recovered),
      countries,
      filteredCountries: countries,
      chartData,
      time,
    });
  }

  render() {
    const {lastUpdated} = state.state;

    return (
      <Router>
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

export default subscribe(App, [state]);
