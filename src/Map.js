import React, {Component} from 'react';
import {View} from 'react-native';
import {renderToStaticMarkup} from 'react-dom/server';
import {divIcon} from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import {subscribe} from 'jstates-react';
import state from './state';
import {numberWithCommas} from './utils';

function averageGeolocation(coords) {
  if (coords.length === 1) {
    return coords[0];
  }

  let x = 0.0;
  let y = 0.0;
  let z = 0.0;

  for (let coord of coords) {
    let lat = (coord.lat * Math.PI) / 180;
    let lon = (coord.lon * Math.PI) / 180;

    x += Math.cos(lat) * Math.cos(lon);
    y += Math.cos(lat) * Math.sin(lon);
    z += Math.sin(lat);
  }

  let total = coords.length;

  x = x / total;
  y = y / total;
  z = z / total;

  let centrallon = Math.atan2(y, x);
  let centralSquareRoot = Math.sqrt(x * x + y * y);
  let centrallat = Math.atan2(z, centralSquareRoot);

  return {
    lat: (centrallat * 180) / Math.PI,
    lon: (centrallon * 180) / Math.PI,
  };
}

const ZOOM_4 = 1058;
const ZOOM_5 = 1558;

const RED = '#f00c32';
const GREEN = '#08cf47';
const GREY = '#30242d';
class Mapx extends Component {
  state = {
    lat: 51.165690999999995,
    lng: 10.451526,
    zoom: 3,
  };
  mapRef = React.createRef();
  handleZoom = () => {
    const zoom = this.mapRef && this.mapRef.current.leafletElement.getZoom();
    if (zoom) {
      this.setState({zoom});
    }
  };
  render() {
    console.log(
      '--¯_(ツ)_/¯-----------this.state.zoom----------',
      this.state.zoom,
    );
    return (
      <View
        style={{
          width: '100%',
          position: 'relative',
          marginBottom: 20,
          marginTop: 20,
        }}>
        <Map
          minZoom={1}
          ref={this.mapRef}
          onzoomend={this.handleZoom}
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
          style={{width: '100%', position: 'relative', height: 400}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {!!this.props.countries &&
            this.props.countries.map((data) => {
              const {
                country,
                confirmed,
                deaths,
                recovered,
                population,
                locations,
              } = data;
              let cords;
              if (locations.length > 1) {
                cords = locations.find((i) => i.state === '');
                if (!cords) {
                  cords = averageGeolocation(locations);
                }
              } else {
                cords = locations[0];
              }
              const point = [cords.lat, cords.lon];

              let confirmedWidth = (
                (confirmed / 100 / 2 / 10) *
                (this.state.zoom * 2)
              ).toFixed(2);

              confirmedWidth = confirmedWidth > 40 ? confirmedWidth : 40;
              let recoveredWidth = ((recovered / confirmed) * 100).toFixed(2);
              let deathsWidth = ((deaths / confirmed) * 100).toFixed(2);

              if (this.state.zoom < 5) {
                confirmedWidth =
                  confirmedWidth < ZOOM_4 ? confirmedWidth : ZOOM_4;
              } else {
                confirmedWidth =
                  confirmedWidth < ZOOM_5 ? confirmedWidth : ZOOM_5;
              }
              //   recoveredWidth = recoveredWidth < 1000 ? recoveredWidth : 1000;
              //   deathsWidth = deathsWidth < 900 ? deathsWidth : 900;
              const outerCircle = {
                backgroundColor: RED,
                color: RED,
                width: `${confirmedWidth}%`,
                height: `${confirmedWidth}%`,
                borderRadius: 100,
                textAlign: 'center',
                marginLeft: `-${confirmedWidth / 2}%`,
                marginTop: `-${confirmedWidth / 2}%`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              };
              const recoveredCircle = {
                zIndex: 600,
                backgroundColor: GREEN,
                color: GREEN,
                width: `${recoveredWidth}%`,
                height: `${recoveredWidth}%`,
                borderRadius: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
              };
              const deathCircle = {
                zIndex: 601,
                position: 'absolute',
                backgroundColor: GREY,
                color: GREY,
                display: 'flex',
                width: `${deathsWidth}%`,
                height: `${deathsWidth}%`,
                borderRadius: 100,
                margin: '0 auto',
              };
              const iconMarkup = renderToStaticMarkup(
                <div style={outerCircle}>
                  <div style={recoveredCircle}></div>
                  <div style={deathCircle}></div>
                </div>,
              );
              const customMarkerIcon = divIcon({
                html: iconMarkup,
              });
              return (
                <Marker position={point} key={country} icon={customMarkerIcon}>
                  <Popup>
                    <span>
                      <b>{country}</b>
                    </span>
                    <br />
                    <span>
                      <span
                        style={{
                          backgroundColor: RED,
                          marginTop: -5,
                          width: 5,
                          height: 5,
                          borderRadius: 100,
                          display: 'inline-block',
                        }}>
                        {' '}
                      </span>{' '}
                      Cases: {numberWithCommas(confirmed)}
                    </span>
                    <br />
                    <span>
                      <span
                        style={{
                          backgroundColor: GREEN,
                          marginTop: -5,
                          width: 5,
                          height: 5,
                          borderRadius: 100,
                          display: 'inline-block',
                        }}>
                        {' '}
                      </span>
                      Recovered: {numberWithCommas(recovered)}
                    </span>
                    <br />
                    <span>
                      <span
                        style={{
                          backgroundColor: GREY,
                          marginTop: -5,
                          width: 5,
                          height: 5,
                          borderRadius: 100,
                          display: 'inline-block',
                        }}>
                        {' '}
                      </span>
                      Deaths: {numberWithCommas(deaths)}
                    </span>
                    <br />
                    {population && (
                      <span>Population: {numberWithCommas(population)}</span>
                    )}
                  </Popup>
                </Marker>
              );
            })}
        </Map>
      </View>
    );
  }
}
export default subscribe(Mapx, state, (state) => ({
  countries: state.countries,
}));
