const bodyParser = require('body-parser')
const express = require('express')
const teams = require('./teams.json')

const app = express()

app.get('/teams', (request, response) => {
  response.send(teams)
})

app.get('/teams/:input', (request, response) => {


  const matchingTeams = teams.filter((team) => {
    return team.id === Number(request.params.input) || team.abbreviation.toUpperCase() === request.params.input.toUpperCase()
  })

  return matchingTeams.length
    ? response.send(matchingTeams)
    : response.sendStatus(404)

})
app.use(bodyParser.json())

app.post('/teams', (request, response) => {
  const { location, mascot, abbreviation, conference, division } = request.body

  if (!location || !mascot || !abbreviation || !conference || !division) {
    response.status(400).send('The following are require: location, mascot, abbreviation, conference, division')
  }
  const lastid = teams.reduce((acc, team) => {
    return team.id > acc ? team.id : acc
  }, 0)


  const newTeam = { location, mascot, abbreviation, conference, division, id: lastid + 1 }

  teams.push(newTeam)

  response.status(201).send(newTeam)

})

const server = app.listen(1337, () => { console.log('Listening on port 1337') })

module.exports = server
