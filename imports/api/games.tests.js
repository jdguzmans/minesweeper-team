/* global describe it beforeEach afterEach */

import { Meteor } from 'meteor/meteor'
import { Games } from './games.js'
import { assert } from 'meteor/practicalmeteor:chai'
import { resetDatabase } from 'meteor/xolvio:cleaner'
import faker from 'faker'
import { Factory } from 'meteor/dburles:factory'
import { sinon } from 'meteor/practicalmeteor:sinon'

if (Meteor.isServer) {
  describe('games', function () {
    let currentUser

    beforeEach(function () {
      resetDatabase()
      Factory.define('user', Meteor.users, {
        username: faker.name.findName()
      })
      currentUser = Factory.create('user')
      sinon.stub(Meteor, 'user')
      Meteor.user.returns(currentUser)
    })

    afterEach(function () {
      Meteor.user.restore()
    })

    describe('newGame', function () {
      it('should create a new game without any field selected', function () {
        let newGameId = Meteor.call('games.newGame')
        let newGame = Games.findOne({_id: newGameId})
        assert.equal(newGameId, newGame._id, 'did not saved the game in the database')
      })
    })

    describe('games.invite', function () {
      it('shoud invite a player to a game', function () {
        let player2 = {username: faker.name.findName()}
        Factory.create('user', player2)
        let gameId = Meteor.call('games.newGame')
        Meteor.call('games.invite', gameId, player2.username)
        let game = Games.findOne({_id: gameId})
        assert.equal(game.invites.includes(player2.username), true, 'did not invited the player')
      })
    })
  })
}
