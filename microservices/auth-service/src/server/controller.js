import {
  authorizeUserQuery,
  insertUserQuery,
  selectByUsername,
} from './queries';
import { setAuthCookie } from './utils';

export const authorizeUser = async (req, res) => {
  try {
    const { rows } = await authorizeUserQuery(req.body);

    if (rows.length === 0) {
      return res.status(401).send('Invalid login or password');
    }

    setAuthCookie(res, rows[0])
  } catch (err) {
    console.log(err);
  }
};

export const registerUser = async (req, res) => {
  try {
    const { rows } = await selectByUsername(req.body);

    if (rows.length > 0) {
      return res.status(409).send('A user with this name already exists');
    }

    await insertUserQuery(req.body);

    setAuthCookie(res, req.body)
  } catch (err) {
    console.log(err);
  }
};

export const getUserInfo = async (req, res) => {
  res.json({ username: req.user.username });
};
