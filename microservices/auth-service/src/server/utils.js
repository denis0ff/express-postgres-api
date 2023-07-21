import jwt from 'jsonwebtoken';

const cookieMaxAge = 1000 * 60 * 60;

const cookieOptions = {
  httpOnly: true,
  sameSite: 'Strict',
  secure: false,
  maxAge: cookieMaxAge,
};

export const setAuthCookie = (res, credentials) => {
  const accessToken = generateToken(credentials);
  return res
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('userId', credentials['id'])
    .json({ accessToken, userId: credentials['id'] });
};

export function generateToken({ username }) {
  return jwt.sign({ username }, 'secret_key', { expiresIn: cookieMaxAge });
}
