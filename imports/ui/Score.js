import React, { Component } from 'react'

class Score extends Component {
  renderPlayerScores () {
    console.log(this.props)
    return this.props.scores.players.map(playerScore => {
      return (
        <h3>- {playerScore.username}: {playerScore.score}</h3>
      )
    })
  }

  render () {
    return (
      <div>
        <h2>Total Score: {this.props.scores.total}pts</h2>
        {this.renderPlayerScores()}
      </div>
    )
  }
}

export default Score
