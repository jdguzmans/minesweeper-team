/* global */

import React, { Component } from 'react'

class GamesSettings extends Component {
  renderGameInvites () {
    return this.props.invites.map(invite => {
      return (
        <div className='normalContainer'>
          {invite.gamePrettyId}
          <button
            key={invite.gameId + 'a'}
            onClick={() => this.props.acceptInvite(invite.gameId)}
            className='btn btn-default'>
            ✓
          </button>
          <button
            key={invite.gameId + 'd'}
            onClick={() => this.props.declineInvite(invite.gameId)}
            className='btn btn-danger'>
            X
          </button>
        </div>
      )
    })
  }

  renderCurrentGames () {
    return this.props.games.map(game => {
      return (
        <div className='normalContainer'>
          <button
            key={game._id}
            onClick={() => this.props.selectGame(game._id)}
            className='btn btn-info'>
            {game.prettyId}
          </button>
        </div>
      )
    })
  }

  renderFinishedGames () {
    return this.props.finishedGames.map(game => {
      return (
        <div className='normalContainer'>
          <button
            key={game._id}
            onClick={() => this.props.selectGame(game._id)}
            className='btn btn-warning'>
            {game.prettyId}
          </button>
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <div className='normalContainer'>
          <h2 className='font'>New Game</h2>
          <button
            onClick={this.props.newGame}
            className='btn btn-success'>
            Create
          </button>
        </div>
        <div className='normalContainer'>
          <h2>Game Invites</h2>
          {this.renderGameInvites()}
        </div>
        <div className='normalContainer'>
          <h2>Current Games</h2>
          {this.renderCurrentGames()}
        </div>
        <div className='normalContainer'>
          <h2>Finished Games</h2>
          {this.renderFinishedGames()}
        </div>
      </div>
    )
  }
}

export default GamesSettings
