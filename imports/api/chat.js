import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

export const Chat = new Mongo.Collection('chat')

if (Meteor.isClient){
  Template.chat.helpers({
    chat:function(){
      return Chat.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.chat.events({
    "submit .add-chat" : function (event){
      var name = event.target.name.value;
      console.log(name);

      Chat.insert({
        name:name,
        CreatedAt: new Date ()
      });

      event.target.name.value = '' ;
      return false;
    }
  })
}

if (Meteor.isServer) {
  // this code only runs on the server
  Meteor.publish('chat', function tasksPublication () {
    return Chat.find({}).map(chat => {
      delete chat['nChat']
      return chat
    })
  })
}

Meteor.methods({
  'chat.insert' (nChat) {
    check(nChat, Object)
    Chat.insert({
      message: nChat,
      createdAt: new Date()
    })
  }
})
