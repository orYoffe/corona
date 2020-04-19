import React, {memo, Suspense} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {subscribe} from 'jstates-react';
import debounce from 'debounce';
import state, {searchState} from '../state';
import DropDown from './DropDown';
import {FilteredList, CountriesList} from './CountryList';
import {white, black} from '../colors';
import {chartList, Box, L, V} from '../utils';

const Map = React.lazy(() => import('./Map'));
const HomeCharts = React.lazy(() => import('./HomeCharts'));

const applySearch = debounce((search) => {
  const currentState = state.getState();
  if (search.length) {
    let filteredCountries = currentState.countries.filter((i) =>
      i.country.toLowerCase().includes(search.toLowerCase()),
    );

    searchState.setState({filteredCountries}, () => {
      const currentState = searchState.getState();
      if (currentState.sortBy) {
        sortCountries(currentState.sortBy);
      }
    });
  } else {
    searchState.setState({filteredCountries: currentState.countries});
  }
}, 300);
const updateSearch = (search = '') => {
  searchState.setState({search});
  applySearch(search);
};

const sortCountries = (value) => {
  let property = chartList[value];
  const filteredCountries = searchState
    .getState()
    .filteredCountries.slice()
    .sort((a, b) => b[property] - a[property]);
  searchState.setState({filteredCountries, sortBy: value});
};

const getFavourites = () => {
  let favourites = localStorage.getItem('f');
  return favourites && JSON.parse(favourites);
};

const Home = ({lastUpdated, allCases, allDeaths, allRecovered, search}) => {
  const f = getFavourites();
  let favourites;
  if (f && Array.isArray(f) && f.length) {
    const list = state
      .getState()
      .countries.filter((i) => f.indexOf(i.country) !== -1);
    favourites = (
      <View
        style={{
          width: '90%',
          borderBottomColor: white,
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
        }}>
        <Text
          style={[
            styles.title,
            styles.text,
            {
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          Quick links to your favourites countries
        </Text>
        <CountriesList list={list} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {favourites}
      <Suspense
        fallback={<ActivityIndicator size="large" style={styles.loader} />}>
        <Map />
      </Suspense>
      {lastUpdated && (
        <Box style={styles.headlines}>
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
      )}
      <Suspense
        fallback={<ActivityIndicator size="large" style={styles.loader} />}>
        <HomeCharts />
      </Suspense>
      <TextInput
        style={styles.search}
        placeholder="Type Country Name Here..."
        onChangeText={updateSearch}
        value={search || ''}
      />
      <DropDown
        options={chartList}
        onSelect={sortCountries}
        label="Sort countries by"
      />
      <FilteredList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    color: white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  headlines: {
    borderBottomColor: white,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
  },
  search: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#ccc',
    width: '90%',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
  },
  text: {
    color: white,
    marginBottom: 5,
  },
  subText: {
    color: white,
    marginBottom: 5,
    fontSize: 10,
  },
  country: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 10,
    borderBottomColor: white,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    backgroundColor: 'darkcyan',
    borderRadius: 3,
    padding: 10,

    shadowColor: black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  loader: {
    marginTop: 40,
    height: 400,
    alignSelf: 'center',
  },
});

export default subscribe(
  memo(Home),
  [state, searchState],
  (state, searchState) => ({
    lastUpdated: state.lastUpdated,
    allCases: state.allCases,
    allDeaths: state.allDeaths,
    allRecovered: state.allRecovered,
    search: searchState.search,
  }),
);
