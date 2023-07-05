import express from 'express';

import { description } from '../../package.json';

import {
  createMeetup,
  updateMeetup,
  deleteMeetup,
  getAllMeetups,
  getMeetupById,
  getMeetupReport,
} from './controller';
import { authenticateToken } from './middleware/auth-middleware';

import {
  validateCreateMeetup,
  validateDeleteMeetup,
  validateGetAllMeetups,
  validateGetMeetupById,
  validateUpdateMeetup,
} from './middleware/validate-middleware';

const port = process.env.PORT || 3000;

export function initServer() {
  const app = express();

  app.use(express.json());

  app.get('/meetups', validateGetAllMeetups, authenticateToken, getAllMeetups);
  app.get(
    '/meetups/:id',
    validateGetMeetupById,
    authenticateToken,
    getMeetupById
  );
  app.post('/meetups', validateCreateMeetup, authenticateToken, createMeetup);
  app.put(
    '/meetups/:id',
    validateUpdateMeetup,
    authenticateToken,
    updateMeetup
  );
  app.delete(
    '/meetups/:id',
    validateDeleteMeetup,
    authenticateToken,
    deleteMeetup
  );
  app.get('/report', validateGetAllMeetups, authenticateToken, getMeetupReport)

  app.listen(port, () => {
    console.log(`${description} running on port ${port}.`);
  });
}
