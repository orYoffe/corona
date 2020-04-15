import React from 'react';
import {View} from 'react-native';

const DropDown = ({onSelect, label, options}) => {
  return (
    <View className="select">
      <label
        style={{
          color: '#fff',
          alignSelf: 'center',
          marginTop: 10,
          marginBottom: 10,
        }}>
        {label}:
      </label>
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
export default DropDown;
