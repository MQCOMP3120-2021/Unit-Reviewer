/**
 * @jest-environment jsdom
 */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import fs from 'fs';

import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../components/HomePage';

const sampleData = (fileName) => {
  const rawData = fs.readFileSync(fileName);
  const data = JSON.parse(rawData);
  return data;
};

describe('Homepage Display', () => {
  test('hompage displays all units', async () => {
    const units = sampleData('src/tests/samples/units.json');
    const getUnits = async () => [units, [1]];
    const component = render(
      <Router>
        <HomePage appLoaded={[1]} unitsLength={5} getUnits={getUnits} />
      </Router>,
    );

    await waitFor(() => {
      units.map((u) => expect(component.container).toHaveTextContent(u.title));
    });
  });

  test('snapshot test', async () => {
    const units = sampleData('src/tests/samples/units.json');
    const getUnits = async () => [units, [1]];
    const component = render(
      <Router>
        <HomePage appLoaded={[1]} unitsLength={5} getUnits={getUnits} />
      </Router>,
    );

    await waitFor(() => {
      expect(component).toMatchSnapshot();
    });
  });
});
