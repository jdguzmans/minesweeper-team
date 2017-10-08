import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Games } from '../api/games.js'
import { Scores } from '../api/scores.js'
import Game from './Game'
import AccountsUIWrapper from './AccountsUIWrapper'
import GamesSettings from './GamesSettings'
import Instructions from './Instructions'
import AllScores from './AllScores'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  newGame () {
    Meteor.call('games.newGame', (err, _id) => {
      if (err) console.log(err)
      this.props.games.forEach(game => {
        if (game._id === _id) this.setState({game: game})
      })
    })
  }

  invitePlayer (gameId, username) {
    Meteor.call('games.invite', gameId, username)
  }

  acceptInvite (gameId) {
    Meteor.call('games.acceptInvite', gameId)
  }

  declineInvite (gameId) {
    Meteor.call('games.declineInvite', gameId)
  }

  selectGame (gameId) {
    let game = this.props.games.concat(this.props.finishedGames).filter(game => {
      return game._id === gameId
    })[0]
    this.setState({
      game: game
    })
  }

  selectSquare (i, j) {
    Meteor.call('games.selectSquare', i, j, this.state.game)
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.game) {
      let game = nextProps.games.concat(nextProps.finishedGames).filter(game => {
        return game._id === this.state.game._id
      })[0]
      this.setState({
        game: game
      })
    }
  }

  sendMessage (message) {
    Meteor.call('games.sendMessage', this.state.game, message)
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-sm-offset-1 col-sm-3'>
            <AccountsUIWrapper />
            <div className='center-text mainContainer'>
              {this.props.user &&
              <GamesSettings
                newGame={this.newGame.bind(this)}
                invites={this.props.invites}
                acceptInvite={this.acceptInvite.bind(this)}
                declineInvite={this.acceptInvite.bind(this)}
                games={this.props.games}
                finishedGames={this.props.finishedGames}
                selectGame={this.selectGame.bind(this)}
            />
          }
            </div>
          </div>
          <div className='col-sm-7'>
            {this.state.game &&
            <Game
              game={this.state.game}
              invitePlayer={this.invitePlayer.bind(this)}
              sendMessage={this.sendMessage.bind(this)}
              scores={this.state.game.scores}
              selectSquare={this.selectSquare.bind(this)} />
            }
            <Instructions />
          </div>
        </div>
        <div className='row'>
          <div className='center-text col-sm-offset-1 col-sm-10'>
            <AllScores scores={this.props.scores} />
          </div>
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('games')
  Meteor.subscribe('scores')

  let username = Meteor.user() ? Meteor.user().username : undefined
  let all = Games.find({}).fetch()

  let games = []
  let finishedGames = []
  let invites = []
  all.forEach(game => {
    game.chat = game.chat.sort((a, b) => {
      return (new Date(b.date).getTime()) - (new Date(a.date).getTime())
    })
    if (game.players.filter(player => { return player.username === username }).length === 1) {
      if (game.finished) finishedGames.push(game)
      else games.push(game)
    } else if (game.invites.includes(username)) invites.push(game)
  })

  let scores = Scores.find({}).fetch()

  return {
    user: Meteor.user(),
    games: games,
    finishedGames: finishedGames,
    invites: invites,
    scores: scores
  }
}, App)
