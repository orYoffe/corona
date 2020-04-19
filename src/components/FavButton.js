import React, {memo, useState} from 'react';
import {Image, TouchableHighlight} from 'react-native';

const isInfavourites = (country) => {
  let favourites = localStorage.getItem('f');
  favourites = favourites && JSON.parse(favourites);
  return (
    favourites &&
    Array.isArray(favourites) &&
    favourites.indexOf(country) !== -1
  );
};

const FavButton = ({country}) => {
  const [inFavourites, setfavourites] = useState(isInfavourites(country));

  return (
    <TouchableHighlight
      style={{
        borderRadius: 100,
        backgroundColor: inFavourites ? '' : '#ccc',
        marginBottom: 10,
      }}
      onPress={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // e.nativeEvent.preventDefault();
        // e.nativeEvent.stopPropagation();
        let favourites = localStorage.getItem('f');
        favourites = favourites && JSON.parse(favourites);
        if (Array.isArray(favourites)) {
          const index = favourites.indexOf(country);
          if (index === -1) {
            favourites.push(country);
            setfavourites(true);
          } else {
            favourites.splice(index, 1);
            setfavourites(false);
          }
        } else {
          setfavourites(true);
          favourites = [country];
        }
        localStorage.setItem('f', JSON.stringify(favourites));
      }}>
      <Image
        accessibilityLabel="Set Country as a favourite"
        accessibilityHint="Set Country as a favourite"
        style={{
          height: 20,
          width: 20,
          marginTop: inFavourites ? 0 : -1,
        }}
        source={{
          uri: require(`../${inFavourites ? 'star' : 'emptyStar'}.png`),
        }}
      />
    </TouchableHighlight>
  );
};

export default memo(FavButton);
