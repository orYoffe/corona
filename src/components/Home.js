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
import {Link} from 'react-router-dom';
import state, {timeState, searchState, chartState} from '../state';
import DropDown from './DropDown';
import FavButton from './FavButton';
import {
  chartList,
  generateBarData,
  numberWithCommas,
  Box,
  L,
  V,
} from '../utils';
const Map = React.lazy(() => import('./Map'));
const Chart = React.lazy(() => import('./Chart'));
const LineChart = React.lazy(() =>
  import('./Chart').then((module) => ({
    default: module.LineChart,
  })),
);

const updateSearch = debounce((search = '') => {
  searchState.setState({search});
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

const setNewChartData = (sort = 'confirmed') => {
  const chartData = generateBarData(
    state.getState().countries.slice(0),
    chartList[sort],
  );

  chartState.setState({chartData});
};

const sortCountries = (value) => {
  let property = chartList[value];
  const filteredCountries = searchState
    .getState()
    .filteredCountries.slice()
    .sort((a, b) => b[property] - a[property]);
  searchState.setState({filteredCountries, sortBy: value});
};

const Charts = ({chartData, lineChartData}) => {
  return (
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

      {chartData && (
        <Suspense
          fallback={
            <ActivityIndicator
              size="large"
              style={{
                marginTop: 40,
                height: 200,
                alignSelf: 'center',
              }}
            />
          }>
          <Chart data={chartData} />
        </Suspense>
      )}
      {lineChartData && (
        <Suspense fallback="">
          <LineChart data={lineChartData} legend />
        </Suspense>
      )}
    </View>
  );
};
const HomeCharts = subscribe(
  memo(Charts),
  [chartState, timeState],
  (chartState, timeState) => ({
    lineChartData: timeState.lineChartData,
    chartData: chartState.chartData,
  }),
);

const CountriesList = memo(({list}) => {
  return (
    <Box>
      {!list ? (
        <ActivityIndicator
          size="large"
          style={{
            marginTop: 40,
            alignSelf: 'center',
          }}
        />
      ) : list.length < 1 ? (
        <Text style={[styles.title, styles.text]}>
          No counteries were found.. try another search term
        </Text>
      ) : (
        list.map(
          (
            {
              country,
              confirmed,
              deaths,
              recovered,
              population,
              precentage,
              active,
            },
            index,
          ) => {
            return (
              <Link
                to={`country/${country}`}
                key={index}
                onClick={(e) => {
                  if (e.target.tagName === 'IMG') {
                    e.preventDefault();
                  }
                }}>
                <View style={styles.country}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <View>
                      <Text style={[styles.title, styles.text]}>{country}</Text>
                      <Text style={styles.text}>
                        <L t="Cases:" /> <V t={numberWithCommas(confirmed)} />
                      </Text>
                      <Text style={styles.subText}>
                        <L t="Active: " />
                        <V t={numberWithCommas(active)} />
                      </Text>
                      <Text style={styles.subText}>
                        <L t="Deaths: " />
                        <V t={numberWithCommas(deaths)} />
                      </Text>
                      <Text style={styles.subText}>
                        <L t="Recovered: " />
                        <V t={numberWithCommas(recovered)} />
                      </Text>

                      {!!population && (
                        <Text style={styles.subText}>
                          <L t="Population: " />
                          <V t={numberWithCommas(population)} />
                        </Text>
                      )}
                      {!!precentage && (
                        <Text style={styles.subText}>
                          <L t="Population infected: " />
                          <V t={precentage + '%'} />
                        </Text>
                      )}
                    </View>
                    <View>
                      <FavButton country={country} />
                    </View>
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
  );
});

const FilteredList = subscribe(CountriesList, searchState, (searchState) => ({
  list: searchState.filteredCountries,
}));

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
      <Box
        style={{
          borderBottomColor: '#fff',
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={[styles.title, styles.text]}>
          Quick links to your favourites countries
        </Text>
        <CountriesList list={list} />
      </Box>
    );
  }
  return (
    <View style={styles.container}>
      {favourites}
      <Suspense
        fallback={
          <ActivityIndicator
            size="large"
            style={{
              marginTop: 40,
              height: 400,
              alignSelf: 'center',
            }}
          />
        }>
        <Map />
      </Suspense>
      {lastUpdated && (
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
      )}
      <HomeCharts />
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#fff',
    marginBottom: 5,
  },
  subText: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 10,
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
