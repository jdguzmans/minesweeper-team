/* global */

import React, { Component } from 'react'

class GamesSettings extends Component {
  renderGames () {
    return this.props.games.map(game => {
      return (
        <button
          key={game._id}
          onClick={() => this.props.selectGame(game._id)}
        >
          {game._id}
        </button>
      )
    })
  }

  renderGameInvites () {
    return this.props.invites.map(invite => {
      return (
        <button
          key={invite._id}
          onClick={() => this.props.acceptInvite(invite._id)}
        >
          {invite._id}
        </button>
      )
    })
  }

  render () {
    return (
      <div>
        <div>
          <h2>New Game</h2>
          <button
            onClick={this.props.newGame}>
            Create
            </button>
        </div>
        <div>
          <h2>Current Games</h2>
          {this.renderGames()}
        </div>
        <div>
          <h2>Game Invites</h2>
          {this.renderGameInvites()}
        </div>
      </div>
    )
  }
}

export default GamesSettings
