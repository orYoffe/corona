import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from 'react-native';
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const Box = ({children, style}) => (
  <View style={[styles.box, style]}>{children}</View>
);
const L = ({t}) => <Text style={styles.label}>{t}</Text>;
const V = ({t}) => <Text style={styles.value}>{t}</Text>;

class App extends Component {
  state = {
    lastUpdated: null,
    search: '',
  };
  updateSearch = (search = '') => {
    this.setState({search});
    if (search.length) {
      const filteredCountries = this.state.countries.filter(i =>
        i.country.toLowerCase().includes(search.toLowerCase()),
      );
      this.setState({filteredCountries});
    }
  };

  async componentDidMount() {
    const all = await fetch('https://corona.lmao.ninja/all').then(j =>
      j.json(),
    );
    const countries = await fetch(
      'https://corona.lmao.ninja/countries',
    ).then(j => j.json());

    this.setState({
      lastUpdated: new Date(all.updated),
      allCases: numberWithCommas(all.cases),
      allDeaths: numberWithCommas(all.deaths),
      allRecovered: numberWithCommas(all.recovered),
      countries,
      filteredCountries: countries,
    });
  }

  render() {
    const {
      lastUpdated,
      allCases,
      allDeaths,
      allRecovered,
      filteredCountries,
      search,
    } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Text style={[styles.title, {color: '#aaa'}]}>
            COVID-19 data from https://corona.lmao.ninja/
          </Text>
          {!lastUpdated ? (
            <ActivityIndicator
              size="large"
              style={{
                marginTop: '40%',
                alignSelf: 'center',
              }}
            />
          ) : (
            <>
              <Box
                style={{
                  borderBottomColor: '#fff',
                  borderBottomStyle: 'solid',
                  borderBottomWidth: 1,
                }}>
                <Text style={[styles.title, styles.text]}>Worldwide</Text>
                <Text key={`Total cases: ${allCases}`} style={styles.text}>
                  <L t="Total cases: " />
                  {allCases}
                </Text>
                <Text key={`Total deaths: ${allDeaths}`} style={styles.text}>
                  <L t="Total deaths: " />
                  {allDeaths}
                </Text>
                <Text
                  key={`Total recovered: ${allRecovered}`}
                  style={styles.text}>
                  <L t="Total recovered: " />
                  {allRecovered}
                </Text>
                <Text
                  key={`updated on: ${lastUpdated.toDateString()}`}
                  style={styles.text}>
                  <L t="Updated on: " />
                  {lastUpdated.toDateString()}
                </Text>
              </Box>
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderWidth: 1,
                  backgroundColor: '#ccc',
                  width: '80%',
                  borderRadius: 3,
                  paddingLeft: 8,
                  paddingRight: 8,
                }}
                placeholder="Type Country Name Here..."
                onChangeText={this.updateSearch}
                value={search || ''}
              />
              <Box>
                {filteredCountries.length < 1
                  ? 'No counteries were found'
                  : filteredCountries.map(
                      (
                        {
                          country,
                          cases,
                          todayCases,
                          deaths,
                          todayDeaths,
                          recovered,
                          active,
                          critical,
                          // casesPerOneMillion,
                        },
                        index,
                      ) => (
                        <View key={index} style={styles.country}>
                          <Text style={[styles.title, styles.text]}>
                            {country}
                          </Text>
                          <Text style={styles.text}>
                            <L t="Cases:" /> <V t={numberWithCommas(cases)} />
                            <L t=" | Today:" />{' '}
                            <V t={numberWithCommas(todayCases)} />
                            <L t=" | Active: " />
                            <V t={numberWithCommas(active)} />
                            <L t=" | Critical: " />
                            <V t={numberWithCommas(critical)} />
                          </Text>
                          <Text style={styles.text}>
                            <L t="Deaths: " />
                            <V t={numberWithCommas(deaths)} />
                            <L t=" | Today: " />
                            <V t={numberWithCommas(todayDeaths)} />
                          </Text>
                          <Text style={styles.text}>
                            <L t="Recovered: " />
                            <V t={numberWithCommas(recovered)} />
                          </Text>
                        </View>
                      ),
                    )}
              </Box>
            </>
          )}
        </View>
      </ScrollView>
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

export default App;
