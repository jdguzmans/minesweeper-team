import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
// import { check } from 'meteor/check'

export const Scores = new Mongo.Collection('scores')

if (Meteor.isServer) {
  // this code only runs on the server
  Meteor.publish('scores', function userScoresPublication () {
    return Scores.find({})
  })
}

Meteor.methods({
  'scores.addScore' (score, players, time) {
    players.forEach(player => {
      let playerDB = Scores.findOne({username: player.username})
      if (!playerDB) playerDB = {username: player.username, games: []}

      playerDB.games.push({totalScore: score, playerScore: player.score, time: time})

      let games = playerDB.games.length
      let scoreSum = 0
      let timeSum = 0
      playerDB.games.forEach(game => {
        scoreSum = scoreSum + game.totalScore
        timeSum = timeSum + game.time
      })

      playerDB.scoreSum = scoreSum
      playerDB.scoreAverage = parseInt(1000 * scoreSum / games) / 1000
      playerDB.speed = parseInt(1000 * scoreSum / timeSum) / 1000
      Scores.upsert({username: playerDB.username}, playerDB)
    })
  }
})
