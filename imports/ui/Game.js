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

//Laura: Es muy interesante que varios jugadores puedan estar en el mismo juego y también que haya un color para cada jugador
//Sería chevere que se pudieran poner turnos porque podría pasar que un jugador seleccione todos los cuadrados y los otros jugadores
//ya no puedan jugar.
//En general, me gustó mucho la página porque el diseño es bueno, los colores son adecuados y las funcionalidades están bien definidas.
//Los únicos cambios que les recomiendo son los de cambiar lo que dice el botón de los juegos actuales y terminados, además, sería bueno
// poner las instrucciones en la parte superior, porque abajo se pierden un poco y tal vez, si en el juego hubo dos personas, poner el color
//del botón, del color de quien tuvo más puntos.

export default Game
