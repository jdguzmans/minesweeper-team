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
        
        <div className='col-lg-6 col-md-6'>
        <div className='game-container '>
          <div className='row'>
            <div className='center-text '>
              <h2 className='primaryFont'>{this.props.showingGame && 'Random Example '} Game {this.props.game.finishedAt && 'Over'}</h2>
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
          <Stats score={this.props.game.score} players={this.props.game.players} />
          <div className='center-block center-text'>
            <Map showingGame={this.props.showingGame} gameMap={this.props.game.gameMap} selectSquare={this.props.selectSquare} />
          </div>
        </div>
        <div className= 'col-lg-6 col-md-6'>
           {!this.props.showingGame && !this.props.game.finishedAt &&
          <div className='center-text dark-container '>
            <h2 className='primaryFont'>Players</h2>
            <div className='row'>
              <div className='col-sm-6 center-text'>
                <h4>Invited Players:</h4>
              </div>
              <div className='col-sm-6 center-text'>
                <h4>Playing:</h4>
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
