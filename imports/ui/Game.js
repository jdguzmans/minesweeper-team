/* global */

import React, { Component } from 'react'
import GameMap from './GameMap'
import Timer from './Timer'
import Score from './Score'

class Game extends Component {
  handleClick (e) {
    e.preventDefault()
    this.props.goToGame(this.props.game.id)
  }

  render () {
    return (
      <div>
        <div className='row'>
          <Timer date={this.props.game.startedAt} />
          <Score score={this.props.score} />
        </div>
        <div className='row'>
          <GameMap gameMap={this.props.game.gameMap} selectSquare={this.props.selectSquare} />
        </div>
      </div>
    )
  }
}

export default Game
