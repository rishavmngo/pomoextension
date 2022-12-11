const express = require('express')
const app = express()
const PORT = 3000
const dotenv = require('dotenv')
const pool = require('./db')
dotenv.config()

app.get('/', async (req, res) => {
  let result
  try {
    result = await pool.query('select * from pomodoro_records')
  } catch (error) {
    console.log(error)
  }
  res.json(result.rows[0])
})

app.post('/api/data', async (req, res) => {
  console.log(req)

  try {
    result = await pool.query(
      `
insert into pomodoro_records(start_timestamp,end_timestamp,total_duration)
values ($1,$2,$3)
		`,
      []
    )
  } catch (error) {
    console.log(error)
  }
})

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
})
