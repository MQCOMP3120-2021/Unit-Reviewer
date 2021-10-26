/* eslint-disable no-undef */

import { IUnit } from '../src/interfaces';
import { addUnit, deleteAllUnits } from '../src/models/Unit';
import requestWithSupertest from './index';

const SAMPLE_UNITS = [
  {
    code: 'COMP1000',
    title: 'Introduction to Programming',
  },
  {
    code: 'COMP1010',
    title: 'More Programming',
  },
  {
    code: 'COMP2000',
    title: 'Object Oriented Programming',
  },
  {
    code: 'COMP2010',
    title: 'Systems Programming',
  },
];

describe('Units Endpoints', () => {
  describe('Unit Get Endpoint', () => {
    beforeAll(async () => {
      await Promise.all(SAMPLE_UNITS.map(async (unit) => {
        await addUnit(unit);
      }));
    });

    it('GET /api/units should return up to 10 different units', async () => {
      const res = await requestWithSupertest.get('/api/units');

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(Math.min(SAMPLE_UNITS.length, 10));

      const units = res.body as IUnit[];
      SAMPLE_UNITS.forEach((sampleUnit) => {
        expect(units.find((unit) => unit.code === sampleUnit.code)).not.toBeNull();
      });
    });

    afterAll(async () => {
      await deleteAllUnits();
    });
  });
});
