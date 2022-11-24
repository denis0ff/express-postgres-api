const { Pool } = require('pg')

const pool = new Pool({
  user: 'client',
  host: 'localhost',
  database: 'meetups',
  password: 'Yjz,hm2022',
  port: 5432,
})

const getMeetups = (req, res) => {
  pool.query('SELECT * FROM meetups ORDER BY id ASC', (err, data) => {
    if (err) throw err
    const { rows } = data
    res.status(200).json(rows)
  })
}

const getMeetupById = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM meetups WHERE id = $1', [id], (err, data) => {
    if (err) {
      throw err
    }
    res.status(200).json(data.rows)
  })
}

const createMeetup = (req, res) => {
  const { title, description, tags, time } = req.body

  pool.query(
    'INSERT INTO meetups (title, description, tags, time) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, description, tags, time],
    (err, data) => {
      if (err) {
        throw err
      }
      res.status(201).send(`Meetup added with ID: ${data.rows[0].id}`)
    }
  )
}

const updateMeetup = (req, res) => {
  const id = parseInt(req.params.id)
  const { title, description, tags, time } = req.body

  pool.query(
    'UPDATE meetups SET title = $1, description = $2, tags = $3, time = $4 WHERE id = $5',
    [title, description, tags, time, id],
    (err, data) => {
      if (err) {
        throw err
      }
      res.status(200).send(`Meetup modified with ID: ${id}`)
    }
  )
}

const deleteMeetup = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM meetups WHERE id = $1', [id], (err) => {
    if (err) {
      throw err
    }
    res.status(200).send(`Meetup deleted with ID: ${id}`)
  })
}

module.exports = {
  getMeetups,
  getMeetupById,
  createMeetup,
  updateMeetup,
  deleteMeetup,
}
