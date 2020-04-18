import {createState} from 'jstates-react';

const state = createState({
  lastUpdated: null,
  search: '',
  filteredCountries: '',
});

export default state;
