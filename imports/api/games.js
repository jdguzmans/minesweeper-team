import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
// import { check } from 'meteor/check'

import Logic from './../logic'
const Users = Meteor.users

export const Games = new Mongo.Collection('games')

if (Meteor.isServer) {
  // this code only runs on the server
  Meteor.publish('games', function gamesPublication () {
    return Games.find({
      $or: [
        { players: { $in: [this.userId] } },
        { invites: { $in: [this.userId] } }
      ]
    })
  })

  Meteor.methods({
    'games.invite' (gameId, username) {
      if (!this.userId) throw new Meteor.Error('not-authorized')
      let user = Users.findOne({username: username})
      if (!user) throw new Meteor.Error('user not found')

      Games.update({_id: gameId},
        {$addToSet: { invites: user._id }}
      )
    }
  })
}

Meteor.methods({
  'games.newGame' () {
    if (!this.userId) throw new Meteor.Error('not-authorized')

    let gameMap = Logic.createGameMap(10, 11)
    Games.insert({
      gameMap: gameMap,
      createdAt: new Date(),
      players: [this.userId],
      invites: [],
      scores: {
        total: 0,
        players: [
        ]
      },
      chat: []
    })
  },

  'games.acceptInvite' (gameId) {
    if (!this.userId) throw new Meteor.Error('not-authorized')
    Games.update({_id: gameId},
      { $pull: { invites: this.userId },
        $addToSet: { players: this.userId }}
    )
  },

  'games.selectSquare' (i, j, game, username) {
    let newMap = Logic.selectSquare(i, j, game.gameMap, username)
    let scores = Logic.calculateScores(game.gameMap, username)
    game.gameMap = newMap
    game.scores.total = scores.total

    let done = false
    game.scores.players.forEach(player => {
      if (player.username === username) {
        player.score = scores.user
        done = true
      }
    })

    if (!done) game.scores.players.push({username: username, score: scores.user})
    Games.update({_id: game._id}, game)
  },

  'games.sendMessage' (gameId, username, text) {
    Games.update({_id: gameId},
      { $push: { chat: {username: username, text: text, date: new Date()} } }
        )
  }
})
