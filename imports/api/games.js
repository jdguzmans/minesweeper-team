import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
// import { check } from 'meteor/check'
import Logic from './../logic'

const Users = Meteor.users

export const Games = new Mongo.Collection('games')

if (Meteor.isServer) {
  // this code only runs on the server
  //Por seguridad, me parece bien que solo muestren los juegos que están relacionados con ese jugador
  Meteor.publish('games', function gamesPublication () {
    let username = Meteor.user() ? Meteor.user().username : undefined
    if (username) {
      return Games.find({
        $or: [
          { 'players.username': { $in: [username] } },
          { invites: { $in: [username] } }
        ]
      })
    } else {
      return Games.find({
        $and: [
          { 'startedAt': {$exists: true} },
          { 'finishedAt': null }
        ]
      }, {limit: 1})
    }
  })

  Meteor.methods({
    'games.newGame' (rows, cols) {
      if (!Meteor.user()._id) throw new Meteor.Error('You are not authorized')
      if (!rows) throw new Meteor.Error('Should select a rows number')
      if (!cols) throw new Meteor.Error('Should select a columns number')
      if (rows < 5 || rows > 15) throw new Meteor.Error('Invalid rows dimension, domain between 10 and 20')
      if (cols < 15 || cols > 20) throw new Meteor.Error('Invalid columns dimension, domain between 5 and 10')

      let gameMap = Logic.createGameMap(rows, cols)
      let date = new Date()
      let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      let year = parseInt(date.getFullYear() - 2000)
      let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Games.insert({
        prettyId: day + '/' + month + '/' + year + '-' + hours + ':' + minutes + ':' + seconds,
        gameMap: gameMap,
        createdAt: date,
        startedAt: null,
        finishedAt: null,
        players: [ { username: Meteor.user().username, color: '#FF8080', lost: false, score: 0 } ],
        invites: [],
        score: 0,
        countedScore: false,
        chat: []
      }, (err, res) => {
        if (err) throw new Meteor.Error('ERROR')
        return res
      })
    },

    'games.invite' (gameId, username) {
      if (!Meteor.user()._id) throw new Meteor.Error('You are not authorized')
      let user = Users.findOne({username: username})
      if (!user) throw new Meteor.Error('User not found')
      else if (username === Meteor.user().username) throw new Meteor.Error('Can not autoinvite')
      let game = Games.findOne({_id: gameId})
      if (game.players.length === 3) throw new Meteor.Error('Player number limit is 3')
      Games.update({_id: gameId},
        {$addToSet: { invites: username }}
      )
    },

    'games.selectSquare' (i, j, gameId) {
      let game = Games.findOne({_id: gameId})
      if (!game.startedAt) game.startedAt = new Date()

      let username = Meteor.user().username
      let plays = true
      game.players.forEach(player => {
        if (player.username === username && player.lost) plays = false
      })
      if (plays) {
        let color
        game.players.forEach(player => {
          if (player.username === username) color = player.color
        })
        let newMap = Logic.selectSquare(i, j, game.gameMap, username, color)
        let scores = Logic.calculateScores(game.gameMap, username)
        game.gameMap = newMap
        game.score = scores.total

        let finished = true
        game.players.forEach(player => {
          if (player.username === username) {
            player.score = scores.user.score
            player.lost = scores.user.lost
          }
          if (!player.lost) finished = false
        })
        if (finished) {
          game.finishedAt = new Date()
          Games.update({_id: game._id}, game)
          Meteor.call('scores.addScore', game._id)
        } else {
          Games.update({_id: game._id}, game)
        }
      }
    }
  })
}

Meteor.methods({
  'games.acceptInvite' (gameId) {
    if (!Meteor.user()._id) throw new Meteor.Error('You are not authorized')
    let numberOfPlayers = Games.findOne({_id: gameId}).players.length
    let color
    if (numberOfPlayers === 1) color = '#8ae5ee'
    else if (numberOfPlayers === 2) color = '#91fd81'
    Games.update({_id: gameId},
      { $pull: { invites: Meteor.user().username },
        $addToSet: { players: { username: Meteor.user().username, color: color, lost: false, score: 0 } } }
    )
  },

  'games.declineInvite' (gameId) {
    if (!Meteor.user()._id) throw new Meteor.Error('You are not authorized')
    Games.update({_id: gameId},
      { $pull: { invites: Meteor.user().username } }
    )
  },

  'games.sendMessage' (gameId, text) {
    let game = Games.findOne({_id: gameId})
    let username = Meteor.user().username
    let color
    game.players.forEach(player => {
      if (player.username === username) color = player.color
    })

    Games.update({_id: game._id},
      { $push: {
        chat: {username: username, text: text, date: new Date(), color: color}
      } }
    )
  }
})

//Este comentario no pertenece aquí, pero me gustaron mucho las encuestas que hicieron, aparte de que pusieron un poco el contexto de cada persona, con estrato, edad, etc, las pregunts acerca de la página son muy precisas
