import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
// import { check } from 'meteor/check'

import Logic from './../logic'
const Users = Meteor.users

export const Games = new Mongo.Collection('games')

if (Meteor.isServer) {
  // this code only runs on the server
  Meteor.publish('games', function gamesPublication () {
    let username = Meteor.user() ? Meteor.user().username : undefined
    return Games.find({
      $or: [
        { 'players.username': { $in: [username] } },
        { invites: { $in: [username] } }
      ]
    })
  })

  Meteor.methods({
    'games.invite' (gameId, username) {
      if (!this.userId) throw new Meteor.Error('not-authorized')
      let user = Users.findOne({username: username})
      if (!user) throw new Meteor.Error('user not found')
      let game = Games.findOne({_id: gameId})
      if (game.players.length === 3) throw new Meteor.Error('player number limit of 3')
      Games.update({_id: gameId},
        {$addToSet: { invites: username }}
      )
    }
  })
}

Meteor.methods({
  'games.newGame' () {
    if (!this.userId) throw new Meteor.Error('not-authorized')

    let gameMap = Logic.createGameMap(7, 8)
    Games.insert({
      gameMap: gameMap,
      createdAt: new Date(),
      players: [ { username: Meteor.user().username, color: '#FF8080', lost: false, score: 0 } ],
      invites: [],
      score: 0,
      chat: []
    })
  },

  'games.acceptInvite' (gameId) {
    if (!this.userId) throw new Meteor.Error('not-authorized')
    let numberOfPlayers = Games.findOne({_id: gameId}).players.length
    let color
    if (numberOfPlayers === 1) color = '#8ae5ee'
    else if (numberOfPlayers === 2) color = '#91fd81'
    Games.update({_id: gameId},
      { $pull: { invites: Meteor.user().username },
        $addToSet: { players: { username: Meteor.user().username, color: color, lost: false } } }
    )
  },

  'games.selectSquare' (i, j, game) {
    let username = Meteor.user().username
    let color
    game.players.forEach(player => {
      if (player.username === username) color = player.color
    })
    let newMap = Logic.selectSquare(i, j, game.gameMap, username, color)
    let scores = Logic.calculateScores(game.gameMap, username)
    game.gameMap = newMap
    game.score = scores.total

    game.players.forEach(player => {
      if (player.username === username) player.score = scores.user
    })
    Games.update({_id: game._id}, game)
  },

  'games.sendMessage' (gameId, username, text) {
    Games.update({_id: gameId},
      { $push: { chat: {username: username, text: text, date: new Date()} } }
        )
  }
})
