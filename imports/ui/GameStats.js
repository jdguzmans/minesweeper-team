import React, { Component } from 'react'

class Score extends Component {
  renderPlayerScores () {
    console.log(this.props)
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

export default Score
