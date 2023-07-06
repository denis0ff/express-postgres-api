import jwt from 'jsonwebtoken';

const cookieMaxAge = 1000 * 60 * 60;

export const setAuthCookie = (res, credentials) => {
  const accessToken = generateToken(credentials);
  return res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: false,
      maxAge: cookieMaxAge,
    })
    .json({ accessToken });
};

export function generateToken({ username }) {
  return jwt.sign({ username }, 'secret_key', { expiresIn: cookieMaxAge });
}
