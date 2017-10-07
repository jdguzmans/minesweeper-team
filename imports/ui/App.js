import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Games } from '../api/games.js'
import { Scores } from '../api/scores.js'
import Game from './Game'
import AccountsUIWrapper from './AccountsUIWrapper'
import GamesSettings from './GamesSettings'
import Instructions from './Instructions'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  newGame () {
    Meteor.call('games.newGame')
  }

  invitePlayer (gameId, username) {
    Meteor.call('games.invite', gameId, username)
  }

  acceptInvite (gameId) {
    Meteor.call('games.acceptInvite', gameId)
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
    Meteor.call('games.sendMessage', this.state.game._id, this.props.user.username, message)
  }

  render () {
    return (
      <div className='highScoresContainer'>
        <div className='col-sm-3'>
          <AccountsUIWrapper />
          {this.props.user &&
            <GamesSettings
              newGame={this.newGame.bind(this)}
              invites={this.props.invites}
              acceptInvite={this.acceptInvite.bind(this)}
              games={this.props.games}
              finishedGames={this.props.finishedGames}
              selectGame={this.selectGame.bind(this)}
            />
          }
        </div>
        <div className='col-sm-6'>
          {this.state.game &&
            <Game
              game={this.state.game}
              invitePlayer={this.invitePlayer.bind(this)}
              sendMessage={this.sendMessage.bind(this)}
              scores={this.state.game.scores}
              selectSquare={this.selectSquare.bind(this)} />
            }
          {!this.state.game && <Instructions /> }
        </div>

        <div className='col-sm-3'>
          <h1>Highscores</h1>
        </div>
      </div>
    )
  }
}

App.propTypes = {
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
