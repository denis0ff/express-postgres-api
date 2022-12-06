const schema = require('./schema')
const {
  selectAll,
  selectById,
  insertData,
  updateById,
  deleteById,
} = require('./queries')

const getMeetups = (req, res) => {
  const validationError = schema.queryParams.validate(req.query).error
  if (validationError) throw res.status(400).json(validationError.message)

  selectAll(req.query)
    .then(({ rows }) => res.status(200).json(rows))
    .catch((err) => {
      throw err
    })
}

const getMeetupById = (req, res) => {
  const id = parseInt(req.params.id)

  const validationError = schema.idParam.validate(id).error
  if (validationError) throw res.status(400).json(validationError.message)

  selectById({ id })
    .then((data) => {
      if (data.rowCount === 0)
        return res.status(404).json('Data with such id was not found')
      res.status(200).json(data.rows)
    })
    .catch((err) => {
      throw err
    })
}

const createMeetup = (req, res) => {
  const validationError = schema.bodyParams.validate(req.body).error
  if (validationError) throw res.status(400).json(validationError.message)

  insertData(req.body)
    .then((data) =>
      res.status(201).send(`Meetup added with ID: ${data.rows[0].id}`)
    )
    .catch((err) => {
      throw err
    })
}

const updateMeetup = (req, res) => {
  const id = parseInt(req.params.id)

  const validationError =
    schema.bodyParams.validate(req.body).error ||
    schema.idParam.validate(id).error

  if (validationError) throw res.status(400).json(validationError.message)

  selectById({ id })
    .then((data) => {
      if (data.rowCount === 0)
        return res.status(404).json('Data with such id was not found')
      updateById({ ...req.body, id })
        .then(() => res.status(200).send(`Meetup modified with ID: ${id}`))
        .catch((err) => {
          throw err
        })
    })
    .catch((err) => {
      throw err
    })
}

const deleteMeetup = (req, res) => {
  const id = parseInt(req.params.id)

  const validationError = schema.idParam.validate(id).error
  if (validationError) throw res.status(400).json(validationError.message)

  deleteById({ id })
    .then(() => res.status(204).send(`Meetup deleted with ID: ${id}`))
    .catch((err) => {
      throw err
    })
}

module.exports = {
  getMeetups,
  getMeetupById,
  createMeetup,
  updateMeetup,
  deleteMeetup,
}
