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
          <h4>- {invite}</h4>
        </div>
      )
    })
  }

  renderPlayers () {
    return this.props.game.players.map(player => {
      return (
        <div className='row'>
          <h4>- {player.username}</h4>
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        {!this.props.game.finished &&
          <div className='row center-text mainContainer'>
            <h1 className='font'>Players</h1>
            <div className='row'>
              <div className='col-sm-offset-1 col-sm-5'>
                <h3 className='font'>Invited Players:</h3>
                {this.renderGameInvites()}
              </div>
              <div className='col-sm-5'>
                <h3 className='font'>Playing:</h3>
                {this.renderPlayers()}
              </div>
            </div>
            <div>
              <InvitePlayer gameId={this.props.game._id} invitePlayer={this.props.invitePlayer} />
            </div>
          </div>
        }

        <div className='gameContainer'>
          <div className='row center-text'>
            <h1 className='font'>Game {this.props.game.finished && 'Over'}</h1>
          </div>
          <div className='row center-text'>
            <h2 className='font'>Id: {this.props.game._id}</h2>
          </div>
          <div className='row center-text'>
            <Timer finished={this.props.game.finished} finishedAt={this.props.game.finishedAt} date={this.props.game.createdAt} />
            <GameStats score={this.props.game.score} players={this.props.game.players} />
          </div>
          <div className='row center-text'>
            <GameMap gameMap={this.props.game.gameMap} selectSquare={this.props.selectSquare} />
          </div>
        </div>

        <div className='row mainContainer'>
          <GameChat chat={this.props.game.chat} sendMessage={this.props.sendMessage} />
        </div>
      </div>
    )
  }
}

export default Game
// Tienen muy bien modularizado todo, felicitaciones. Así se entiende mucho más el código que teniendo todo en un solo render
