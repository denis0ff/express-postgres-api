const { Pool } = require('pg')

const pool = new Pool({
  user: 'client',
  host: 'localhost',
  database: 'meetups',
  password: 'Yjz,hm2022',
  port: 5432,
})

const selectAll = () => pool.query('SELECT * FROM meetups ORDER BY id ASC')

const selectById = (data) => {
  const { id } = data
  return pool.query('SELECT * FROM meetups WHERE id = $1', [id])
}

const insertData = (data) => {
  const { title, description, tags, time } = data
  return pool.query(
    `INSERT INTO meetups (title, description, tags, time) VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, description, tags, time]
  )
}

const updateById = (data) => {
  const { title, description, tags, time, id } = data
  return pool.query(
    'UPDATE meetups SET title = $1, description = $2, tags = $3, time = $4 WHERE id = $5',
    [title, description, tags, time, id]
  )
}

const deleteById = (data) => {
  const { id } = data
  return pool.query('DELETE FROM meetups WHERE id = $1', [id])
}

module.exports = {
  selectAll,
  selectById,
  insertData,
  updateById,
  deleteById,
}
