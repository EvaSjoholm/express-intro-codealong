import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here - creating app.get which is a get request
// We give it a path to handle the response, which is nominations as example, and then we can ask 
// questions things the users has sent to us like URL, params etc.
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/nominations', (req, res) => {
  res.json(data)
})

//Here we GET the data variable out of the URL, with the year as placeholder
// that becomes req.params.year - We then use that to filter our array
// and return only the items that match that. 
app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showWon = req.query.won
  let nominationsFromYear = data.filter((item) => item.year_award === +year)

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  }

  res.json(nominationsFromYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
