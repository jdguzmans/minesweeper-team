/* global */

import React, { Component } from 'react'

class GamesSettings extends Component {
  
  // Laura: Podrían poner otra cosa en lugar del id del juego en el botón, porque es un poco confuso ver tantos caracteres diferentes.
  //Tal vez la fecha de inicio del juego daría más información de que juego se trata.
  
  renderGames () {
    return this.props.games.map(game => {
      return (
        <div className='row'>
          <button
            key={game._id}
            onClick={() => this.props.selectGame(game._id)}
            className='btn btn-info'>
            {game._id}
          </button>
        </div>
      )
    })
  }

  renderFinishedGames () {
    return this.props.finishedGames.map(game => {
      return (
        <div className='row'>
          <button
            key={game._id}
            onClick={() => this.props.selectGame(game._id)}
            className='btn btn-warning'>
            {game._id}
          </button>
        </div>
      )
    })
  }

  renderGameInvites () {
    return this.props.invites.map(invite => {
      return (
        <div className='row'>
          {invite._id}
          <button
            key={invite._id + 'a'}
            onClick={() => this.props.acceptInvite(invite._id)}
            className='btn btn-default'>
            ✓
          </button>
          <button
            key={invite._id + 'd'}
            onClick={() => this.props.declineInvite(invite._id)}
            className='btn btn-danger'>
            X
          </button>
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <div>
          <h2 className='font'>New Game</h2>
          <button
            onClick={this.props.newGame}
            className='btn btn-success'>
            Create
          </button>
        </div>
        <div>
          <h2 className='font'>Game Invites</h2>
          {this.renderGameInvites()}
        </div>
        <div>
          <h2 className='font'>Current Games</h2>
          {this.renderGames()}
        </div>
        <div>
          <h2 className='font'>Finished Games</h2>
          {this.renderFinishedGames()}
        </div>
      </div>
    )
  }
}

export default GamesSettings
