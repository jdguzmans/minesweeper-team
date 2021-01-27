/* global */

import React, { Component } from 'react'
import Map from './Game/Map'
import Timer from './Game/Timer'
import Stats from './Game/Stats'
import InvitePlayer from './Game/InvitePlayer'
import Chat from './Game/Chat'

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
          <div className='center-text dark-container'>
            <h1 className='primaryFont'>Players</h1>
            <div className='row'>
              <div className='col-sm-6 center-text'>
                <h3 className='primaryFont'>Invited Players:</h3>
              </div>
              <div className='col-sm-6 center-text'>
                <h3 className='primaryFont'>Playing:</h3>
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

        <div className='game-container'>
          <div className='row'>
            <div className='center-text '>
              <h2 className='primaryFont'>{this.props.showingGame && 'Random Example '} Game {this.props.game.finishedAt && 'Over'}</h2>
            </div>
          </div>
          <div className='row'>
            <div className='center-text'>
              <h5>Id: {this.props.game.prettyId}</h5>
            </div>
          </div>
          <div className='row'>
            <div className='center-text'>
              <Timer createdAt={this.props.game.createdAt} startedAt={this.props.game.startedAt} finishedAt={this.props.game.finishedAt} />
            </div>
          </div>
          <Stats score={this.props.game.score} players={this.props.game.players} />
          <div className='center-block center-text'>
            <Map showingGame={this.props.showingGame} gameMap={this.props.game.gameMap} selectSquare={this.props.selectSquare} />
          </div>
        </div>

        <div className='dark-container'>
          <Chat showingGame={this.props.showingGame} chat={this.props.game.chat} sendMessage={this.props.sendMessage} />
        </div>

      </div>
    )
  }
}

export default Game
// Tienen muy bien modularizado todo, felicitaciones. Así se entiende mucho más el código que teniendo todo en un solo render
