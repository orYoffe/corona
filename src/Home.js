import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {subscribe} from 'jstates-react';
import {Link} from 'react-router-dom';
import Chart, {LineChart} from './Chart';
import state from './state';
import Map from './Map';
import DropDown from './DropDown';
import {chartList, generateBarData, numberWithCommas, Box, L, V} from './utils';

const updateSearch = (search = '') => {
  state.setState({search});
  const currentState = state.getState();
  if (search.length) {
    let filteredCountries = currentState.countries.filter((i) =>
      i.country.toLowerCase().includes(search.toLowerCase()),
    );

    state.setState({filteredCountries}, () => {
      if (currentState.sortBy) {
        sortCountries(currentState.sortBy);
      }
    });
  } else {
    state.setState({filteredCountries: currentState.countries});
  }
};

const setNewChartData = (sort = 'confirmed') => {
  const chartData = generateBarData(
    state.getState().countries,
    chartList[sort],
  );

  state.setState({chartData});
};

const sortCountries = (value) => {
  let property = chartList[value];
  const filteredCountries = state
    .getState()
    .filteredCountries.slice()
    .sort((a, b) => b[property] - a[property]);
  state.setState({filteredCountries, sortBy: value});
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
  } = state.getState();

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
          <Map />
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
            <DropDown
              options={chartList}
              onSelect={setNewChartData}
              label="Select chart data"
            />
            <Chart data={chartData} />
            <LineChart data={lineChartData} legend />
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
          <DropDown
            options={chartList}
            onSelect={sortCountries}
            label="Sort countries by"
          />
          <Box>
            {filteredCountries.length < 1 ? (
              <Text style={[styles.title, styles.text]}>
                No counteries were found.. try another search term
              </Text>
            ) : (
              filteredCountries.map(
                (
                  {
                    country,
                    confirmed,
                    deaths,
                    recovered,
                    population,
                    precentage,
                  },
                  index,
                ) => {
                  return (
                    <Link to={`country/${country}`} key={index}>
                      <View style={styles.country}>
                        <View>
                          <Text style={[styles.title, styles.text]}>
                            {country}
                          </Text>
                          <Text style={styles.text}>
                            <L t="Cases:" />{' '}
                            <V t={numberWithCommas(confirmed)} />
                          </Text>
                          <Text style={styles.text}>
                            <L t="Deaths: " />
                            <V t={numberWithCommas(deaths)} />
                          </Text>
                          <Text style={styles.text}>
                            <L t="Recovered: " />
                            <V t={numberWithCommas(recovered)} />
                          </Text>

                          {!!population && (
                            <Text style={styles.text}>
                              <L t="Population: " />
                              <V t={numberWithCommas(population)} />
                            </Text>
                          )}
                          {!!precentage && (
                            <Text style={styles.text}>
                              <L t="Population infected: " />
                              <V t={precentage + '%'} />
                            </Text>
                          )}
                        </View>
                        <Text
                          style={[
                            {
                              alignSelf: 'flex-end',
                              color: '#fff',
                              padding: 10,
                              width: '100%',
                              backgroundColor: '#00429d',
                              lineHeight: 35,
                              borderRadius: 3,
                              textAlign: 'center',
                              shadowColor: '#000',
                              shadowOffset: {width: 0, height: 1},
                              shadowOpacity: 0.8,
                              shadowRadius: 2,
                              elevation: 5,
                            },
                          ]}>
                          See country stats
                        </Text>
                      </View>
                    </Link>
                  );
                },
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 10,
    borderBottomColor: '#fff',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    backgroundColor: 'darkcyan',
    borderRadius: 3,
    padding: 10,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default subscribe(Home, state);
