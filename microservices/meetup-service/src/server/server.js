import express from 'express';
import bodyParser from 'body-parser';

import {
  getMeetup,
  createMeetup,
  updateMeetup,
  deleteMeetup,
} from './controller';

export function initServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.json());

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.get('/', (_, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' });
  });
  app.get('/meetups', getMeetup);
  app.post('/meetups/add', createMeetup);
  app.put('/meetups/modify/:id', updateMeetup);
  app.delete('/meetups/remove/:id', deleteMeetup);

  app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });
}
