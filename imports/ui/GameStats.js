import React, { Component } from 'react'

class GameStats extends Component {
  renderPlayerScores () {
    return this.props.players.map(player => {
      return (
        <h3>- {player.username}: {player.score}: {player.lost ? 'Died' : 'Still alive'}</h3>
      )
    })
  }

  render () {
    return (
      <div>
        <h2>Total Score: {this.props.score}pts</h2>
        {this.renderPlayerScores()}
      </div>
    )
  }
}

export default GameStats
