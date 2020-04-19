import {createState} from 'jstates-react';

const state = createState({
  lastUpdated: null,
});

export const timeState = createState({});
export const searchState = createState({
  search: '',
});
export const countryState = createState({});
export const chartState = createState({});

export default state;
