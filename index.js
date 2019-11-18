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

const server = app.listen(1337, () => { console.log('Listening on port 1337') })

module.exports = server
