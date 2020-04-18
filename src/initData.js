import {generateBarData, numberWithCommas, colors, format} from './utils';
import state from './state';

const getLineChartData = (timeCountries) => {
  const lineChartData = {
    labels: [],
    datasets: [],
  };

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

  return lineChartData;
};

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
const sortTime = (time) =>
  time.countries.sort((a, b) => {
    let aTotal = 0;
    let bTotal = 0;
    a.locations.forEach((l) => {
      aTotal += l.total;
    });
    b.locations.forEach((l) => {
      bTotal += l.total;
    });

    return bTotal - aTotal;
  });
export const parseTimeData = (time) => {
  console.log('--¯_(ツ)_/¯-----------time----------', time);
  const timeCountries = sortTime(time).slice(0, 10);
  const lineChartData = getLineChartData(timeCountries);

  state.setState({lineChartData, time});
};
export const parseData = (d, j) => {
  const countries = d.countries
    .map((country) => {
      const newCountry = {
        ...country,
        active: country.confirmed - (country.recovered + country.deaths),
      };

      const countryPopulations = j.records.filter((i) => {
        const countryName = i.fields.country_name;
        return (
          countryName.toLowerCase() === country.country.toLowerCase() ||
          countryName === countryNamesExceptions[country.country]
        );
      });

      if (!countryPopulations.length) {
        return newCountry;
      }

      const countryPopulation = countryPopulations.sort(
        (a, b) => b.fields.year - a.fields.year,
      )[0];

      if (!countryPopulation || !countryPopulation.fields.value) {
        return newCountry;
      }

      newCountry.population = countryPopulation.fields.value;
      const perc = (
        (country.confirmed / countryPopulation.fields.value) *
        100
      ).toFixed(2);

      if (perc + '' !== '0.00') {
        newCountry.precentage = perc;
      }

      return newCountry;
    })
    .sort((a, b) => b.confirmed - a.confirmed);

  state.setState({
    lastUpdated: new Date(d.date.replace(/-/g, '/')),
    allCases: numberWithCommas(d.confirmed),
    allDeaths: numberWithCommas(d.deaths),
    allRecovered: numberWithCommas(d.recovered),
    countries,
    filteredCountries: countries,
  });
  const chartData = generateBarData(countries.slice(0));
  state.setState({
    chartData,
  });
};
