// import React, {memo} from 'react';
// import {View} from 'react-native';
// import {Bar, Line, Pie} from 'react-chartjs-2';
// import {numberWithCommas, colors} from '../utils';
import Chart, {LineChart, BarChart, PieChart} from './Chart';

import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';

describe('Chart', () => {
  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  it('renders with or without a name', () => {
    const data = {datasets: [{backgroundColor: 1}]};
    act(() => {
      render(<Chart data={data} />, container);
    });
    console.log(
      '--¯_(ツ)_/¯-----------Object.keys(container)----------',
      Object.keys(container),
    );
    expect(container).toBe(
      '<div><div class="css-view-1dbjc4n" style="height: 40vh; margin-top: 20px; position: relative; width: 100%;"><canvas height="150" width="300" /></div></div>',
    );

    // act(() => {
    //   render(<Chart name="Jenny" />, container);
    // });
    // expect(container.textContent).toBe('Chart, Jenny!');

    // act(() => {
    //   render(<Hello name="Margaret" />, container);
    // });
    // expect(container.textContent).toBe('Hello, Margaret!');
  });
});
