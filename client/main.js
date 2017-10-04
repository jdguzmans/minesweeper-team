import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import App from '../imports/ui/App.jsx'
import { Chat } from '/imports/api/chat';

var localVariable;

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'))
 
  localVariable = Chat;
  console.log(Chat);

})
