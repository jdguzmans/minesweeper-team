import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

export const Games = new Mongo.Collection('games')

if (Meteor.isServer) {
  // this code only runs on the server
  Meteor.publish('games', function tasksPublication () {
    return Games.find({}).map(game => {
      delete game['gameMap']
      return game
    })
  })
}

Meteor.methods({
  'games.insert' (gameMap) {
    check(gameMap, Object)
    Games.insert({
      gameMap: gameMap,
      createdAt: new Date()
    })
  }
})
