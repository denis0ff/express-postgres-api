import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const accessToken = req.cookies['accessToken'];

  if (!accessToken) return res.status(401).send('User is not authorized');

  jwt.verify(accessToken, 'secret_key', (err, user) => {
    if (err) {
      return res.status(403).send('User session is expired');
    }

    req.user = user;
    next();
  });
}
