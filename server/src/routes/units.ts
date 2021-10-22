import express, { Request, Response } from 'express';
import jwt from 'express-jwt';
import { sign } from 'jsonwebtoken';

import { JWT_SECRET, JWT_COOKIE_NAME } from '../config';
import { IReview, IUnit } from '../interfaces';
import Unit, {
  addReview, addUnit, deleteReview, deleteUnit, getUnit,
} from '../models/Unit';
import User, { addUserReview, deleteUserReview, checkReviews } from '../models/User';
import { getToken } from './auth';

const unitsRouter = express.Router();

const UNIT_NOT_FOUND_ERROR = 'Unit not found';
const UNABLE_TO_ADD_UNIT_ERROR = 'Unable to add unit';
const UNABLE_TO_DELETE_UNIT_ERROR = 'Unable to delete unit';
const UNABLE_TO_ADD_REVIEW_ERROR = 'Unable to add review';
const UNABLE_TO_DELETE_REVIEW_ERROR = 'Unable to delete review';
const NO_PERMISSION_ERROR = "You don't have permission to do that";
const REVIEW_NOT_FOUND_ERROR = 'Review not found';

/**
 * The Actitivies type
 * @typedef {object} Activities
 * @property {array<Activity>} scheduled - Scheduled activities
 * @property {array<Activity>} nonScheduled - Non-scheduled activities
 */

/**
 * An Activity type
 * @typedef {object} Activity
 * @property {string} name.required - The name of the activity
 * @property {string} description.required - The description of the activity
 * @property {array<string>} offerings.required - The offerings of the activity
 */

/**
 * An Assessment type
 * @typedef {object} Assessment
 * @property {string} title.required - The title of the assessment
 * @property {string} description.required - The description of the assessment
 * @property {boolean} hurdle.required - Whether the assessment is a hurdle or not
 * @property {string} type.required - The type of assessment
 * @property {number} weighting.required - The weight of the assessment out of 100
 */

/**
 * An Offering type
 * @typedef {object} Offering
 * @property {string} attendance.required - Online or In Person
 * @property {string} location.required - The location of the offering
 * @property {string} period.required - The period of the offering
 */

/**
 * A Review type
 * @typedef {object} Review
 * @property {string} unitId.required - The id of the unit being reviewed
 * @property {string} content.required - The text content of the review
 * @property {number} rating - The units rating out of 10 for this review
 * @property {string} author - The username of the reviews author
 * @property {number} dateCreated - The date the review was received
 */

/**
 * A Unit type
 * @typedef {object} Unit
 * @property {string} code.required - The unit code
 * @property {string} title.required - The unit title
 * @property {string} description.required - The unit description
 * @property {array<Offering>} offerings.required - List of offerings for the unit
 * @property {Activities} activities - The unit's activities
 * @property {array<Assessment>} assessments.required - The units assessments
 * @property {number} credits.required - The number of credit points that the unit is worth
 * @property {string} department.required - The department to which the unit belongs
 * @property {string} faculty.required - The faculty to which the unit belongs
 * @property {string} group - The group to which the unit belonds
 * @property {string} level - The units level
 * @property {array<string>} prerequisites - The units prerequisites
 * @property {array<string>} nccw - The units NCCW's
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
    if (!req.user || !req.user.admin) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const {
      code,
      title,
      description,
      offerings,
      activities,
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

    const unit = {
      code,
      title,
      description,
      offerings,
      activities,
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
    };

    try {
      const savedUnit = await addUnit(unit);
      return res.json(savedUnit.toJSON());
    } catch (error) {
      return res.status(400).send({ error: UNABLE_TO_ADD_UNIT_ERROR });
    }
  },
);

/**
 * DELETE /api/units/{unitId}
 * @summary Adds the given unit to the database
 * @param {string} unitId.path.required - Unit ID
 * @return {object} 200 - Success response
 */
unitsRouter.delete(
  '/:unitId',
  jwt({ secret: JWT_SECRET, algorithms: ['HS512'], getToken }),
  async (req, res) => {
    if (!req.user || !req.user.admin) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const { unitId } = req.params;

    try {
      await deleteUnit(unitId);
      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).send({ error: UNABLE_TO_DELETE_UNIT_ERROR });
    }
  },
);

/**
 * POST /api/units/review
 * @summary Adds a review to the given unit
 * @param {Review} request.body.required - Review info
 * @return {Unit} 200 - The saved unit
 */
 unitsRouter.post(
  '/review',
  jwt({ secret: JWT_SECRET, algorithms: ['HS512'], getToken }),
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const { unitId } = req.body;
    const { content, rating, author } = req.body as IReview;
    const dateCreated = Date.now();

    const user = await User.findOne({ username: author });
    if (!user) {
      return res.status(404).send({ error: 'user not found' });
    }

    // eslint-disable-next-line no-underscore-dangle
    const userId = user._id;

    try {
      await addReview(unitId, {
        content,
        rating,
        author,
        dateCreated,
        unitId,
      });
      await addUserReview(userId, {
        content,
        rating,
        author: user.username,
        dateCreated,
        unitId,
      });
      const hasReviews = await checkReviews(user.username);
      const token = sign({ username: user.username,
        admin: user.admin,
        reviews: hasReviews
      }, JWT_SECRET, {
        expiresIn: '1h',
        algorithm: 'HS512',
      });
      return res.status(200).cookie(JWT_COOKIE_NAME, token).send();
    } catch (error) {
      return res.status(400).send({ error: UNABLE_TO_ADD_REVIEW_ERROR });
    }
  },
);

/**
 * DELETE /api/units/review/{unitId}/{reviewId}
 * @summary Deletes a review from the given unit
 * @param {string} unitId.path.required - Unit ID
 * @param {string} reviewId.path.required - Review ID
 * @return {object} 200 - Sucess Response
 */
unitsRouter.delete(
  '/review/:unitId/:reviewId',
  jwt({ secret: JWT_SECRET, algorithms: ['HS512'], getToken }),
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const { unitId, reviewId } = req.params;

    const initUser = req.body; //as IUser;
    //const { username } = user;

    try {
      
      const unit = await getUnit(unitId);

      if (unit === null) {
        return res.status(404).send({ error: 'Unit does not exist' });
      }

      const user = await User.findOne({
        username: initUser.username,
        admin: initUser.admin,
        reviews: initUser.reviews
      });

      if (user === null) {
        return res.status(404).send({ error: 'User does not exist' });
      }

      const { reviews } = unit as { reviews: any[] };

      if (reviews.length === 0) {
        return res.status(404).send({ error: REVIEW_NOT_FOUND_ERROR });
      }
      
      // finding review in user's record
      const reviewUser = user.reviews.find((x : any) => x.unitId === unitId);

      // finding review in unit's record. As the provided reviewId in the route may be the reviewId
      // of the review in the user's record, we then check according to the information provided in reviewUser
      // eslint-disable-next-line no-underscore-dangle
      const reviewUnit = reviews.find((x) => x._id.equals(reviewId)) ? reviews.find((x) => x._id.equals(reviewId)) :
      reviewUser ? reviews.find((x) => x.unitId === reviewUser.unitId && x.author === reviewUser.author 
      && x.content === reviewUser.content && x.rating === reviewUser.rating)
      : null;

      if (user.username !== reviewUser.author) {
        return res.status(401).send({ error: NO_PERMISSION_ERROR });
      }

      try {
        // eslint-disable-next-line no-underscore-dangle
        await deleteReview(reviewUnit.unitId, reviewUnit._id);
        // eslint-disable-next-line no-underscore-dangle
        await deleteUserReview(user._id, reviewUser._id);
        const hasReviews = await checkReviews(user.username);
        const token = sign({
          username: user.username,
          admin: user.admin,
          reviews: hasReviews
        }, JWT_SECRET, {
          expiresIn: '1h',
          algorithm: 'HS512',
        });
        return res.status(200).cookie(JWT_COOKIE_NAME, token).send();
      } catch (error) {
        return res.status(400).send({ error: UNABLE_TO_DELETE_REVIEW_ERROR });
      }
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
);

// TODO - Edit a unit

export default unitsRouter;
