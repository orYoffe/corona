import React from 'react';

const DropDown = ({onSelect, label, options}) => {
  return (
    <label
      style={{
        color: '#fff',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
      }}>
      {label}:{' '}
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
    </label>
  );
};
export default DropDown;
