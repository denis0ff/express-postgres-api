import { Pool } from 'pg';

const pool = new Pool({
  user: 'client',
  host: 'localhost',
  database: 'meetups',
  password: 'Yjz,hm2022',
  port: 5432,
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
