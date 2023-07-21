import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5000,
  database: process.env.DB_DATABASE || 'db_meetup',
});

export const authorizeUserQuery = (data) => {
  const { username, password } = data;

  return pool.query(
    'SELECT * FROM users WHERE username = $1 AND password = $2',
    [username, password]
  );
};

export const selectByUsername = (data) => {
  const { username } = data;
  return pool.query('SELECT * FROM users WHERE username = $1', [username]);
};

export const insertUserQuery = (data) => {
  const { username, password } = data;

  return pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
    [username, password]
  );
};
