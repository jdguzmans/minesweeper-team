/* global describe it beforeEach afterEach */

import { Meteor } from 'meteor/meteor'
import { Games } from './games.js'
import { Scores } from './scores.js'
import { assert } from 'meteor/practicalmeteor:chai'
import { resetDatabase } from 'meteor/xolvio:cleaner'
import faker from 'faker'
import { Factory } from 'meteor/dburles:factory'
import { sinon } from 'meteor/practicalmeteor:sinon'

let user1

if (Meteor.isServer) {
  console.log(Scores === null)
  describe('games', function () {
    describe('just one player', function () {
      beforeEach(function () {
        resetDatabase()
        Factory.define('user', Meteor.users, {
          username: faker.name.findName()
        })
        user1 = Factory.create('user')
        sinon.stub(Meteor, 'user')
        Meteor.user.returns(user1)
      })

      afterEach(function () {
        Meteor.user.restore()
      })

      describe('newGame', function () {
        it('should create a new game without any field selected', function () {
          let newGameId = Meteor.call('games.newGame', 15, 20)
          let newGame = Games.findOne({_id: newGameId})
          assert(newGame)
          assert(newGame.createdAt)
          assert(!newGame.startedAt)
          assert(!newGame.finishedAt)
          assert.equal(newGameId, newGame._id, 'did not saved the game in the database')
        })
      })

      describe('invite', function () {
        it('shoud invite a player to a game', function () {
          let player2 = {username: faker.name.findName()}
          Factory.create('user', player2)
          let gameId = Meteor.call('games.newGame', 15, 20)
          Meteor.call('games.invite', gameId, player2.username)
          let game = Games.findOne({_id: gameId})
          assert.equal(game.invites.includes(player2.username), true, 'did not invited the player')
        })
      })
    })

    describe('interaction of players', function () {
      let game
      let user2
      describe('invites', function () {
        beforeEach(function () {
          resetDatabase()
          Factory.define('user', Meteor.users, {
            username: faker.name.findName()
          })
          user1 = Factory.create('user')
          sinon.stub(Meteor, 'user')
          Meteor.user.returns(user1)
          let gameId = Meteor.call('games.newGame', 15, 20)
          game = Games.findOne({_id: gameId})
          Meteor.user.restore()

          let username2 = faker.name.findName()
          user2 = Factory.create('user', {username: username2})
          sinon.stub(Meteor, 'user')
          Meteor.user.returns(user2)
        })

        afterEach(function () {
          Meteor.user.restore()
        })

        describe('accept', function () {
          it('should accept invite', function () {
            Meteor.call('games.acceptInvite', game._id)
            let acceptedGame = Games.findOne({_id: game._id})
            let found = false
            acceptedGame.players.forEach(player => {
              if (player.username === user2.username) found = true
            })
            assert(found, 'did not accepted the invite')
          })
        })

        describe('decline', function () {
          it('should decline invite', function () {
            Meteor.call('games.declineInvite', game._id)
            let declinedGame = Games.findOne({_id: game._id})
            let found = false
            declinedGame.players.forEach(player => {
              if (player.username === user2.username) found = true
            })
            assert(!found, 'did not declined the invite')
          })
        })
      })
      describe('sendMessage', function () {
        beforeEach(function () {
          resetDatabase()
          Factory.define('user', Meteor.users, {
            username: faker.name.findName()
          })
          user1 = Factory.create('user')
          sinon.stub(Meteor, 'user')
          Meteor.user.returns(user1)
          let gameId = Meteor.call('games.newGame', 15, 20)
          game = Games.findOne({_id: gameId})
        })

        afterEach(function () {
          Meteor.user.restore()
        })

        it('should send message', function () {
          let text = faker.lorem.sentence()
          Meteor.call('games.sendMessage', game, text)
          let messagedGame = Games.findOne({_id: game._id})
          assert.equal(messagedGame.chat[0].text, text, 'the message was incorrect')
          assert.equal(messagedGame.chat[0].username, Meteor.user().username, 'the message was not correctly sent by the correct user')
        })
      })

      describe('selectSquare', function () {
        beforeEach(function () {
          resetDatabase()
          Factory.define('user', Meteor.users, {
            username: faker.name.findName()
          })
          user1 = Factory.create('user')
          sinon.stub(Meteor, 'user')
          Meteor.user.returns(user1)
          let gameId = Meteor.call('games.newGame', 15, 20)
          game = Games.findOne({_id: gameId})
        })

        afterEach(function () {
          Meteor.user.restore()
        })

        it('should select correctly the square', function () {
          let done = false
          while (!done) {
            let playedGame = Games.findOne({_id: game._id})
            let row = Math.floor(Math.random() * ((playedGame.gameMap.length - 1) - 0 + 1)) + 0
            let col = Math.floor(Math.random() * ((playedGame.gameMap[0].length - 1) - 0 + 1)) + 0
            Meteor.call('games.selectSquare', row, col, playedGame)
            playedGame = Games.findOne({_id: playedGame._id})
            assert(playedGame.startedAt)
            assert(playedGame.gameMap[row][col].selectedBy)
            if (playedGame.gameMap[row][col].value === -1) {
              assert(playedGame.finishedAt)
            } else assert(!playedGame.finishedAt)
            done = playedGame.finishedAt
          }
        })
      })
    })
  })
}
