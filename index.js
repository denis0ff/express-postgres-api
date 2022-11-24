const express = require('express')
const bodyParser = require('body-parser')

const {
  getMeetups,
  getMeetupById,
  createMeetup,
  updateMeetup,
  deleteMeetup,
} = require('./src/controller')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/meetups', getMeetups)
app.get('/meetups/:id', getMeetupById)
app.post('/meetups', createMeetup)
app.put('/meetups/:id', updateMeetup)
app.delete('/meetups/:id', deleteMeetup)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
