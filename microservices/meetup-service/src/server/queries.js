import { Pool } from 'pg';

const pool = new Pool({
  user: 'client',
  host: 'localhost',
  database: 'meetups',
  password: 'Yjz,hm2022',
  port: 5432,
});

export const selectAllQuery = (data) => {
  const {
    title = '',
    description = '',
    orderBy = 'id',
    order = 'ASC',
    limit = 'ALL',
  } = data;
  const offset = data.page && data.limit ? data.page * data.limit : '0';

  return pool.query(
    `SELECT * FROM meetups WHERE title ~* $1 AND description ~* $2 ORDER BY ${orderBy} ${order} LIMIT ${limit} OFFSET $3`,
    [title, description, offset]
  );
};

export const selectByIdQuery = (data) => {
  return pool.query('SELECT * FROM meetups WHERE id = $1', [data.id]);
};

export const insertMeetupQuery = (data) => {
  const { title, description, tags, time } = data;

  return pool.query(
    `INSERT INTO meetups (title, description, tags, time) VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, description, tags, time]
  );
};

export const updateByIdQuery = (data) => {
  const { title, description, tags, time, id } = data;

  return pool.query(
    'UPDATE meetups SET title = $1, description = $2, tags = $3, time = $4 WHERE id = $5',
    [title, description, tags, time, id]
  );
};

export const deleteByIdQuery = (data) => {
  return pool.query('DELETE FROM meetups WHERE id = $1', [data.id]);
};
