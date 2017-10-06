/* global */

import React, { Component } from 'react'
import GameMap from './GameMap'
import Timer from './Timer'
import Score from './Score'
import InvitePlayer from './InvitePlayer'

class Game extends Component {
  render () {
    return (
      <div>
        <div className='row'>
          <Timer date={this.props.game.createdAt} />
          <Score scores={this.props.scores} />
        </div>
        <div className='row'>
          <GameMap gameMap={this.props.game.gameMap} selectSquare={this.props.selectSquare} />
        </div>
        <div className='row'>
          <InvitePlayer gameId={this.props.game._id} invitePlayer={this.props.invitePlayer} />
        </div>
      </div>
    )
  }
}

export default Game
