import React, {memo} from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {Link} from 'react-router-dom';
import {subscribe} from 'jstates-react';
import {searchState} from '../state';
import FavButton from './FavButton';

import {white, black} from '../colors';
import {Box, L, V, numberWithCommas} from '../utils';

export const CountriesList = memo(({list}) => {
  return !list ? (
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
      ({
        country,
        confirmed,
        deaths,
        recovered,
        population,
        precentage,
        active,
      }) => {
        return (
          <Link
            to={`country/${country}`}
            key={`country/${country}`}
            onClick={(e) => {
              if (e.target.tagName === 'IMG') {
                e.preventDefault();
              }
            }}>
            <View style={styles.country}>
              <View style={styles.innerContainer}>
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
              <Text style={styles.link}>See country stats</Text>
            </View>
          </Link>
        );
      },
    )
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
  link: {
    alignSelf: 'flex-end',
    color: white,
    padding: 10,
    width: '100%',
    backgroundColor: '#00429d',
    lineHeight: 35,
    borderRadius: 3,
    textAlign: 'center',
    shadowColor: black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export const FilteredList = subscribe(
  ({list}) => (
    <Box>
      <CountriesList list={list} />
    </Box>
  ),
  searchState,
  (searchState) => ({
    list: searchState.filteredCountries,
  }),
);
