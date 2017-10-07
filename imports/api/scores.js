import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
// import { check } from 'meteor/check'

export const Scores = new Mongo.Collection('scores')

if (Meteor.isServer) {
  // this code only runs on the server
  Meteor.publish('scores', function userScoresPublication () {
    console.log(Scores.find({}).fetch())
    return Scores.find({})
  })
}

Meteor.methods({
  'scores.addScore' (score, players, time) {
    players.forEach(player => {
      Scores.upsert({username: player.username}, {
        $push: {games: {totalScore: score, playerScore: player.score, time: time}}
      })
    })
  }
})
