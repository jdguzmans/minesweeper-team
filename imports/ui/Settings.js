/* global */

import React, { Component } from 'react'

class Settings extends Component {
  renderGameInvites () {
    return this.props.invites.map((invite, i) => {
      return (
        <div className='normal-container' key={i}>
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
    return this.props.games.map((game, i) => {
      return (
        <div className='normal-container' key={i}>
          <button
            key={game._id}
            aria-label='Active game'
            onClick={() => this.props.selectGame(game._id)}
            className='btn btn-info'>
            {game.prettyId}
          </button>
        </div>
      )
    })
  }

  renderFinishedGames () {
    return this.props.finishedGames.map((game, i) => {
      return (
        <div className='normal-container' key={i}>
          <button
            key={game._id}
            aria-label='Active game'
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
        <div className='normal-container'>
          <h2 className='primaryFont'>New Game</h2>
          <button
            onClick={this.props.newGame}
            className='btn btn-success'>
            Create
          </button>
        </div>
        <div className='normal-container'>
          <h2 className='primaryFont'>Game Invites</h2>
          {this.renderGameInvites()}
        </div>
        <div className='normal-container'>
          <h2 className='primaryFont'>Current Games</h2>
          {this.renderCurrentGames()}
        </div>
        <div className='normal-container'>
          <h2 className='primaryFont'>Finished Games</h2>
          {this.renderFinishedGames()}
        </div>
      </div>
    )
  }
}

export default Settings
