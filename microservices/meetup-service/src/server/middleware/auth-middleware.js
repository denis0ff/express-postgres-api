import http from 'http';

export async function authenticateToken(req, res, next) {
  const request = http.get(
    {
      host: process.env.AUTH_HOST || 'localhost',
      port: process.env.AUTH_PORT || 4000,
      path: '/verify',
      headers: {
        Cookie: req.headers.cookie || '',
      },
    },
    ({ statusCode, statusMessage }) => {
      if (statusCode !== 200) {
        res.status(statusCode).send(statusMessage);
      } else {
        next();
      }
    }
  );

  request.end();
}
