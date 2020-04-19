import React, {memo} from 'react';
import {View} from 'react-native';
import {white} from '../colors';

const labelStyle = {
  color: white,
  alignSelf: 'center',
  marginTop: 10,
  marginBottom: 10,
};
const DropDown = ({onSelect, label, options}) => {
  return (
    <View className="select">
      <label style={labelStyle}>{label}:</label>
      <select
        onChange={(e) => {
          onSelect(e.currentTarget.value);
        }}>
        {Object.keys(options).map((i) => {
          return (
            <option key={`dropdownItem_${i}`} value={i}>
              {i}
            </option>
          );
        })}
      </select>
    </View>
  );
};
export default memo(DropDown);
