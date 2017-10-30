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
let game

if (Meteor.isServer) {
  describe('addScore', function () {
    beforeEach(function () {
      resetDatabase()
      Factory.define('user', Meteor.users, {
        username: faker.name.findName()
      })
      user1 = Factory.create('user')
      sinon.stub(Meteor, 'user')
      Meteor.user.returns(user1)
      let gameId = Meteor.call('games.newGame')
      game = Games.findOne({_id: gameId})
    })

    afterEach(function () {
      Meteor.user.restore()
    })

    it('should save the correct score', function () {
      let done = false
      while (!done) {
        let playedGame = Games.findOne({_id: game._id})
        let row = Math.floor(Math.random() * ((playedGame.gameMap.length - 1) - 0 + 1)) + 0
        let col = Math.floor(Math.random() * ((playedGame.gameMap[0].length - 1) - 0 + 1)) + 0
        Meteor.call('games.selectSquare', row, col, playedGame)
        playedGame = Games.findOne({_id: playedGame._id})

        done = playedGame.finishedAt
      }
      let scores = Scores.findOne({username: user1.username})
      let games = scores.games.length
      let scoreSum = 0
      let timeSum = 0
      scores.games.forEach(aGame => {
        scoreSum = scoreSum + aGame.totalScore
        timeSum = timeSum + aGame.time
      })
      let scoreAverage = parseInt(100 * scoreSum / games) / 100
      assert.equal(scoreSum, scores.scoreSum)
      assert.equal(scoreAverage, scores.scoreAverage)
    })
  })
}
