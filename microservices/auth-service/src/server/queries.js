import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'client',
  password: process.env.DB_PASSWORD || 'Yjz,hm2022',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || 'meetups',
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

  return pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
    username,
    password,
  ]);
};
