import express from 'express';
import cookieParser from 'cookie-parser';
import { description } from '../../package.json';

import { authorizeUser, getUserInfo, registerUser } from './controller';
import { authenticateToken } from './middleware/auth-middleware';
import { validateUserCredentials } from './middleware/validate-middleware';

const port = process.env.PORT || 4000;

export function initServer() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.post('/login', validateUserCredentials, authorizeUser);
  app.post('/register', validateUserCredentials, registerUser);
  app.get('/verify', authenticateToken, getUserInfo);

  app.listen(port, () => {
    console.log(`${description} running on port ${port}.`);
  });
}
