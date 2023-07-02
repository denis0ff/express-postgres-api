import http from 'http';

export async function authenticateToken(req, res, next) {
  const request = http.get(
    'http://localhost:4000/verify',
    {
      headers: {
        Cookie: req.headers.cookie,
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
