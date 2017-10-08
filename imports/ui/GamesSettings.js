/* global */

import React, { Component } from 'react'

class GamesSettings extends Component {
  renderGames () {
    return this.props.games.map(game => {
      return (
        <div className='row'>
          <button
            key={game._id}
            onClick={() => this.props.selectGame(game._id)}
            className='btn btn-primary'>
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
            className='btn btn-info'>
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
        <div className='mainContainer newGame'>
          <h2>New Game</h2>
          <button
            onClick={this.props.newGame}
            className='btn btn-success'>
            Create
          </button>
        </div>
        <div className='mainContainer'>
          <h2>Game Invites</h2>
          {this.renderGameInvites()}
        </div>
        <div className='mainContainer'>
          <h2>Current Games</h2>
          {this.renderGames()}
        </div>
        <div className='mainContainer'>
          <h2>Finished Games</h2>
          {this.renderFinishedGames()}
        </div>
      </div>
    )
  }
}

export default GamesSettings
