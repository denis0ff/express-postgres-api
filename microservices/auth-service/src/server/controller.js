import {
  authorizeUserQuery,
  insertUserQuery,
  selectByUsername,
} from './queries';
import { setAuthCookie } from './utils';

export const authorizeUser = async (req, res, next) => {
  try {
    const { rows, rowCount } = await authorizeUserQuery(req.body);

    if (rowCount === 0) {
      return res.status(401).send('Invalid login or password');
    }

    setAuthCookie(res, rows[0]);
  } catch (err) {
    next(err);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { rowCount } = await selectByUsername(req.body);

    if (rowCount > 0) {
      return res.status(409).send('A user with this name already exists');
    }

    const { rows } = await insertUserQuery(req.body);

    setAuthCookie(res, rows[0]);
  } catch (err) {
    next(err);
  }
};

export const getUserInfo = async (req, res) => {
  res.json({ username: req.user.username });
};
