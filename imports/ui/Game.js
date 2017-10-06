/* global */

import React, { Component } from 'react'
import GameMap from './GameMap'
import Timer from './Timer'
import GameStats from './GameStats'
import InvitePlayer from './InvitePlayer'
import GameChat from './GameChat'

class Game extends Component {
  render () {
    return (
      <div>
        <h1>Game {this.props.game.finished && 'Over'}</h1>
        <div className='row'>
          <InvitePlayer gameId={this.props.game._id} invitePlayer={this.props.invitePlayer} />
        </div>
        <div className='row'>
          <Timer finished={this.props.game.finished} finishedAt={this.props.game.finishedAt} date={this.props.game.createdAt} />
          <GameStats score={this.props.game.score} players={this.props.game.players} />
        </div>
        <div className='row'>
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
