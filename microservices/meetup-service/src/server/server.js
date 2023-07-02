import express from 'express';
import { description } from '../../package.json';

import {
  createMeetup,
  updateMeetup,
  deleteMeetup,
  getAllMeetups,
  getMeetupById,
} from './controller';

import {
  validateCreateMeetup,
  validateDeleteMeetup,
  validateGetAllMeetups,
  validateGetMeetupById,
  validateUpdateMeetup,
} from './middleware/validate-middleware';

export function initServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  app.get('/', (_, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' });
  });
  app.get('/meetups', validateGetAllMeetups, getAllMeetups);
  app.get('/meetups/:id', validateGetMeetupById, getMeetupById);
  app.post('/meetups', validateCreateMeetup, createMeetup);
  app.put('/meetups/:id', validateUpdateMeetup, updateMeetup);
  app.delete('/meetups/:id', validateDeleteMeetup, deleteMeetup);

  app.listen(port, () => {
    console.log(`${description} running on port ${port}.`);
  });
}
