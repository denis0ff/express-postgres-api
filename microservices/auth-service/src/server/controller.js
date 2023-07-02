import { generateToken } from './middleware/auth-middleware';
import {
  authorizeUserQuery,
  insertUserQuery,
  selectByUsername,
} from './queries';

export const authorizeUser = async (req, res) => {
  try {
    const { rows } = await authorizeUserQuery(req.body);

    if (rows.length === 0) {
      return res.status(401).send('Invalid login or password');
    }

    res.json({ token: generateToken(rows[0]) });
  } catch (err) {
    res.status(500).json(err.toString());
  }
};

export const registerUser = async (req, res) => {
  try {
    const { rows } = await selectByUsername(req.body);

    if (rows.length > 0) {
      return res.status(409).send('A user with this name already exists');
    }

    await insertUserQuery(req.body);

    res.json({ token: generateToken(req.body) });
  } catch (err) {
    res.status(500).json(err.toString());
  }
};

export const getUserInfo = async (req, res) => {
  res.json({ username: req.user.username });
};
