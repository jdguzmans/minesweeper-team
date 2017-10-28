/* global */

import React, { Component } from 'react'
import GameMap from './GameMap'
import Timer from './Timer'
import GameStats from './GameStats'
import InvitePlayer from './InvitePlayer'
import GameChat from './GameChat'

class Game extends Component {
  renderGameInvites () {
    return this.props.game.invites.map(invite => {
      return (
        <div className='center-text'>
          <h4>- {invite}</h4>
        </div>
      )
    })
  }

  renderPlayers () {
    return this.props.game.players.map(player => {
      return (
        <div className='center-text'>
          <h4>- {player.username}</h4>
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        {!this.props.showingGame && !this.props.game.finishedAt &&
          <div className='center-text darkContainer'>
            <h1>Players</h1>
            <div className='row'>
              <div className='col-sm-6 center-text'>
                <h3>Invited Players:</h3>
              </div>
              <div className='col-sm-6 center-text'>
                <h3>Playing:</h3>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-6'>
                {this.renderGameInvites()}
              </div>
              <div className='col-sm-6'>
                {this.renderPlayers()}
              </div>
            </div>
            <InvitePlayer gameId={this.props.game._id} invitePlayer={this.props.invitePlayer} />
          </div>
        }

        <div className='gameContainer'>
          <div className='row'>
            <div className='center-text'>
              <h1>{this.props.showingGame && 'Random Example '} Game {this.props.game.finishedAt && 'Over'}</h1>
            </div>
          </div>
          <div className='row'>
            <div className='center-text'>
              <h2>{this.props.game.prettyId}</h2>
            </div>
          </div>
          <div className='row'>
            <div className='center-text'>
              <Timer createdAt={this.props.game.createdAt} startedAt={this.props.game.startedAt} finishedAt={this.props.game.finishedAt} />
            </div>
          </div>
          <GameStats score={this.props.game.score} players={this.props.game.players} />
          <div className='center-block center-text'>
            <GameMap showingGame={this.props.showingGame} gameMap={this.props.game.gameMap} selectSquare={this.props.selectSquare} />
          </div>
        </div>
        <div className='darkContainer'>
          <GameChat showingGame={this.props.showingGame} chat={this.props.game.chat} sendMessage={this.props.sendMessage} />
        </div>
      </div>
    )
  }
}

export default Game
