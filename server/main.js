import { Meteor } from 'meteor/meteor'
import { Inject } from 'meteor/meteorhacks:inject-initial'
import '../imports/api/games.js'
import '../imports/api/scores.js'

Meteor.startup(() => {
  // code to run on server at startup
  Inject.rawModHtml('addLanguage', function (html) {
    return html.replace(/<html>/, '<!-- HTML 5 -->\n<html lang="en">')
  })
})
// Bien que hayan hecho esto del lado del servidor para que apenas cargue la página agregue el tag html con el lenguaje, así las herramientas
// de accesibilidad como las usadas por los ciegos pueden identificar el lenguaje y hacer mejor su trabajo.
