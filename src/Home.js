import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {Link} from 'react-router-dom';
import Chart, {LineChart} from './Chart';
import state from './state';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Box = ({children, style}) => (
  <View style={[styles.box, style]}>{children}</View>
);

const L = ({t}) => <Text style={styles.label}>{t}</Text>;
const V = ({t}) => <Text style={styles.value}>{t}</Text>;

const updateSearch = (search = '') => {
  state.setState({search});
  if (search.length) {
    const filteredCountries = state.state.countries.filter((i) =>
      i.country.toLowerCase().includes(search.toLowerCase()),
    );
    state.setState({filteredCountries});
  }
};
const Home = () => {
  const {
    lastUpdated,
    lineChartData,
    allCases,
    allDeaths,
    allRecovered,
    filteredCountries,
    search,
    chartData,
  } = state.state;

  return (
    <View style={styles.container}>
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
          <Box
            style={{
              borderBottomColor: '#fff',
              borderBottomStyle: 'solid',
              borderBottomWidth: 1,
            }}>
            <Text style={[styles.title, styles.text]}>Worldwide</Text>
            <Text key={`Total cases: ${allCases}`} style={styles.text}>
              <L t="Total cases: " />
              <V t={allCases} />
            </Text>
            <Text key={`Total deaths: ${allDeaths}`} style={styles.text}>
              <L t="Total deaths: " />
              <V t={allDeaths} />
            </Text>
            <Text key={`Total recovered: ${allRecovered}`} style={styles.text}>
              <L t="Total recovered: " />
              <V t={allRecovered} />
            </Text>
            <Text
              key={`updated on: ${lastUpdated.toDateString()}`}
              style={styles.text}>
              <L t="Updated on: " />
              <V t={lastUpdated.toDateString()} />
            </Text>
          </Box>
          <View
            style={{
              width: '80%',
              marginBottom: 20,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Chart data={chartData} />
            <LineChart data={lineChartData} />
          </View>
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
            onChangeText={updateSearch}
            value={search || ''}
          />
          <Box>
            {filteredCountries.length < 1 ? (
              <Text style={[styles.title, styles.text]}>
                No counteries were found.. try another search term
              </Text>
            ) : (
              filteredCountries.map(
                ({country, confirmed, deaths, recovered}, index) => (
                  <Link to={`/country/${country}`} key={index}>
                    <View style={styles.country}>
                      <Text style={[styles.title, styles.text]}>{country}</Text>
                      <Text style={styles.text}>
                        <L t="Cases:" /> <V t={numberWithCommas(confirmed)} />
                      </Text>
                      <Text style={styles.text}>
                        <L t="Deaths: " />
                        <V t={numberWithCommas(deaths)} />
                      </Text>
                      <Text style={styles.text}>
                        <L t="Recovered: " />
                        <V t={numberWithCommas(recovered)} />
                      </Text>
                    </View>
                  </Link>
                ),
              )
            )}
          </Box>
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

export default Home;
