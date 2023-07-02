import express from 'express';
import { description } from '../../package.json';

import { authorizeUser, getUserInfo, registerUser } from './controller';
import { authenticateToken } from './middleware/auth-middleware';
import { validateUserCredentials } from './middleware/validate-middleware';

export function initServer() {
  const app = express();
  const port = process.env.PORT || 4000;

  app.use(express.json());

  app.post('/login', validateUserCredentials, authorizeUser);
  app.post('/register', validateUserCredentials, registerUser);
  app.get('/profile', authenticateToken, getUserInfo);

  app.listen(port, () => {
    console.log(`${description} running on port ${port}.`);
  });
}
