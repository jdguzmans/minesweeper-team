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
        <div className='row'>
          - {invite}
        </div>
      )
    })
  }

  render () {
    return (
      <div className='center-text'>
        {!this.props.game.finished &&
          <div className='row'>
            <h1>Invites</h1>
            <div className='col-sm-6'>
              <InvitePlayer gameId={this.props.game._id} invitePlayer={this.props.invitePlayer} />
            </div>
            <div className='col-sm-6'>
              <h3>Invited Players:</h3>
              {this.renderGameInvites()}
            </div>
          </div>
        }
        <div className='row center-text'>
          <h1>Game {this.props.game.finished && 'Over'}</h1>
        </div>
        <div className='row center-text'>
          <h2>Id: {this.props.game._id}</h2>
        </div>
        <div className='row center-text'>
          <Timer finished={this.props.game.finished} finishedAt={this.props.game.finishedAt} date={this.props.game.createdAt} />
          <GameStats score={this.props.game.score} players={this.props.game.players} />
        </div>
        <div className='row center-text'>
          <GameMap gameMap={this.props.game.gameMap} selectSquare={this.props.selectSquare} />
        </div>
        <div className='row'>
          <GameChat chat={this.props.game.chat} sendMessage={this.props.sendMessage} />
        </div>
      </div>
    )
  }
}

export default Game
