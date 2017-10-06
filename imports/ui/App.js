import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Games } from '../api/games.js'
import Game from './Game'
import AccountsUIWrapper from './AccountsUIWrapper'
import GamesSettings from './GamesSettings'

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
    let game = this.props.games.filter(game => {
      return game._id === gameId
    })[0]
    this.setState({
      game: game
    })
  }

  selectSquare (i, j) {
    Meteor.call('games.selectSquare', i, j, this.state.game, this.props.user.username)
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.game) {
      let game = nextProps.games.filter(game => {
        return game._id === this.state.game._id
      })[0]
      this.setState({
        game: game
      })
      console.log(game)
    }
  }

  render () {
    return (
      <div>
        <div className='col-sm-4'>
          <AccountsUIWrapper />
          {this.props.user &&
            <GamesSettings
              newGame={this.newGame.bind(this)}
              invites={this.props.invites}
              acceptInvite={this.acceptInvite.bind(this)}
              games={this.props.games}
              selectGame={this.selectGame.bind(this)}
            />
          }
        </div>
        {this.state.game &&
          <div className='col-sm-8'>
            <h1>Game</h1>
            <Game
              game={this.state.game}
              invitePlayer={this.invitePlayer.bind(this)}
              scores={this.state.game.scores}
              selectSquare={this.selectSquare.bind(this)} />
          </div>
          }
      </div>
    )
  }
}

App.propTypes = {
}

export default createContainer(() => {
  Meteor.subscribe('games')
  let all = Games.find({}).fetch()
  let games = all.filter(game => {
    return game.players.includes(Meteor.user()._id)
  })
  let invites = all.filter(game => {
    return game.invites.includes(Meteor.user()._id)
  })

  return {
    user: Meteor.user(),
    games: games,
    invites: invites
  }
}, App)
