import express from 'express';
import cookieParser from 'cookie-parser';

import { description } from '../../package.json';

import {
  createMeetup,
  updateMeetup,
  deleteMeetup,
  getAllMeetups,
  getMeetupById,
  getMeetupReport,
  getMeetupBySearch,
} from './controller';
import { authenticateToken } from './middleware/auth-middleware';

import {
  validateCreateMeetup,
  validateDeleteMeetup,
  validateGetAllMeetups,
  validateGetMeetupById,
  validateGetReport,
  validateSearchMeetup,
  validateUpdateMeetup,
} from './middleware/validate-middleware';
import { errorHandler } from './middleware/error-middleware';

const port = process.env.PORT || 3000;

export function initServer() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(authenticateToken);
  app.use(errorHandler);

  app.get('/meetups', validateGetAllMeetups, getAllMeetups);
  app.get('/meetups/:id', validateGetMeetupById, getMeetupById);
  app.post('/meetups', validateCreateMeetup, createMeetup);
  app.put('/meetups/:id', validateUpdateMeetup, updateMeetup);
  app.delete('/meetups/:id', validateDeleteMeetup, deleteMeetup);
  app.get('/report/:type', validateGetReport, getMeetupReport);
  app.get('/search', validateSearchMeetup, getMeetupBySearch);

  app.listen(port, () => {
    console.log(`${description} running on port ${port}.`);
  });
}
