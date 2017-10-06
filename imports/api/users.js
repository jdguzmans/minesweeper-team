import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Crypto from 'crypto'
import JSONWebToken from 'jsonwebtoken'

export const Users = new Mongo.Collection('users2')

if (Meteor.isServer) {

}

Meteor.methods({
  'users.login' (user) {
    check(user, Object)
    let a = Users.findOne({
      email: user.email,
      password: user.password
    })
    console.log(a)
    return a
  }
})

Meteor.methods({
  'users.register' (user) {
    check(user, Object)
    let q = Users.findOne({email: user.email})
    if (q) throw new Meteor.Error('user already existed')

    let salt = Crypto.randomBytes(16).toString('hex')
    let hash = Crypto.pbkdf2Sync(user.password, salt, 1000, 64, 'sha1').toString('hex')
    let userToSave = {
      email: user.email,
      hash: hash,
      salt: salt
    }

    Users.insert(userToSave)

    var expiry = new Date()
    expiry.setDate(expiry.getDate() + 7)

    return {token: JSONWebToken.sign({
      _id: user._id,
      email: user.email,
      exp: parseInt(expiry.getTime() / 1000)
    }, 'MY_SECRET')}
  }
})
