// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
}
