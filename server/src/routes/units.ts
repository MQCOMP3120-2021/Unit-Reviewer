import express from 'express';
import jwt from 'express-jwt';

import { JWT_SECRET } from '../config';
import { IReview, IUnit } from '../interfaces';
import Unit from '../models/Unit';
import { getToken } from './auth';

const unitsRouter = express.Router();

const UNIT_NOT_FOUND_ERROR = 'Unit not found';

/**
 * A Review type
 * @typedef {object} Review
 * @property {string} content.required - The text content of the review
 * @property {number} rating - The units rating out of 10 for this review
 * @property {string} author - The username of the reviews author
 * @property {number} dateCreated - The date the review was received
 */

/**
 * An Activities type
 * @typedef {object} Activities
 * @property {string} name.required - The name of the activity
 * @property {number} weight.required - The weight of the activity out of 100
 */

/**
 * An Assessment type
 * @typedef {object} Assessment
 * @property {string} name.required - The name of the assessment
 * @property {number} weight.required - The weight of the assessment out of 100
 */

/**
 * A Unit type
 * @typedef {object} Unit
 * @property {string} code.required - The unit code
 * @property {string} title.required - The unit title
 * @property {string} description.required - The unit description
 * @property {array<Assessment>} assessments.required - The units assessments
 * @property {number} credits.required - The number of credit points that the unit is worth
 * @property {string} department.required - The department to which the unit belongs
 * @property {string} faculty.required - The faculty to which the unit belongs
 * @property {array<string>} offerings.required - List of offerings for the unit - e.g. ["S1", "S2",
 *  "S3"]
 * @property {array<string>} scheduledActivities - The unit's scheduled activities
 * @property {array<string>} nonScheduledActivities - The unit's non-scheduled activities
 * @property {string} group - The group to which the unit belonds
 * @property {string} level - The units level
 * @property {array<string>} prerequisites - The units prerequisites
 * @property {array<string>} level - The units NCCW's
 * @property {array<string>} outcomes - The units outcomes
 * @property {number} rating - The units rating out of 10
 * @property {array<Review>} reviews - List of reviews for the unit
 */

/**
 * GET /api/units
 * @summary Returns 10 units at a time offset from from the `start` query parameter
 * @param {number} start.query - The offset to get units from
 * @return {array<Unit>} 200 - Success response
 * @return {object} 400 - Bad request
 */
unitsRouter.get('/', async (req, res) => {
  const start = Number(req.query.start) || 0;

  // Invalid start
  if (start < 0) {
    return res.status(400).send({ error: 'Invalid start' });
  }
  const units = await Unit.find({}, null, {
    skip: start,
    limit: 10,
  });
  return res.json(units);
});

/**
 * GET /api/units/search
 * @summary Returns units that match the given query text in any text field
 * @param {string} q.query.required - The content to search for
 * @return {array<Unit>} 200 - Success response
 * @return {object} 404 - No results found
 */
unitsRouter.get('/search', async (req, res) => {
  const query = req.query.q || '';

  if (query === '') {
    res.status(404).send({ error: 'No query provided' });
    return;
  }

  const units = await Unit.aggregate().search({
    index: 'default',
    text: {
      query,
      path: {
        wildcard: '*',
      },
    },
  });

  res.json(units);
});

/**
 * GET /api/units/numUnits
 * @summary Returns the number of units in the database
 * @return {number} 200 - Success response
 */
unitsRouter.get('/numUnits', async (req, res) => {
  const numUnits = await Unit.collection.countDocuments({});

  res.json({ numUnits });
});

/**
 * GET /api/units/{id}
 * @summary Returns the unit with the given id
 * @param {number} id.path.required - The id of the unit to return
 * @return {Unit} 200 - Success response
 * @return {object} 404 - Unit not found
 */
unitsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const unit = await Unit.findById(id);
    if (unit) {
      return res.json(unit);
    }
    return res.status(404).send({ error: UNIT_NOT_FOUND_ERROR });
  } catch (error) {
    return res.status(404).send({ error: UNIT_NOT_FOUND_ERROR });
  }
});

/**
 * POST /api/units
 * @summary Adds the given unit to the database
 * @param {Unit} request.body.required - Unit info
 * @return {Unit} 200 - The saved unit
 */
unitsRouter.post(
  '/',
  jwt({ secret: JWT_SECRET, algorithms: ['HS512'], getToken }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const {
      code,
      title,
      description,
      offerings,
      scheduledActivities,
      nonScheduledActivities,
      assessments,
      credits,
      department,
      faculty,
      group,
      level,
      prerequisites,
      nccw,
      outcomes,
    } = req.body as IUnit;
    const rating = 0;
    const reviews: IReview[] = [];

    const unit = new Unit({
      code,
      title,
      description,
      offerings,
      scheduledActivities,
      nonScheduledActivities,
      assessments,
      credits,
      department,
      faculty,
      group,
      level,
      prerequisites,
      nccw,
      outcomes,
      rating,
      reviews,
    });

    const savedUnit = await unit.save();
    return res.json(savedUnit.toJSON());
  },
);

// TODO - Add a review

// TODO - Edit a unit

export default unitsRouter;
