import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { Games} from './games.js'

export const Scores = new Mongo.Collection('scores')

if (Meteor.isServer) {
  // this code only runs on the server
  Meteor.publish('scores', function userScoresPublication () {
    return Scores.find({})
  })

  Meteor.methods({
    'scores.addScore' (gameId) {
      let game = Games.findOne({_id: gameId})
      if (!game) throw new Meteor.Error('Game does not exist, sorry JuanCardona')
      if (!game.finishedAt) throw new Meteor.Error('Game is not finished yet, sorry JuanCardona')
      let time = parseInt((game.finishedAt.getTime() - (new Date(game.createdAt)).getTime()) / 1000)
      let score = game.score

      game.players.forEach(player => {
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
        playerDB.scoreAverage = parseInt(100 * scoreSum / games) / 100
        playerDB.speed = parseInt(100 * 60 * scoreSum / timeSum) / 100
        Scores.upsert({username: playerDB.username}, playerDB)
      })
    }
  })
}
