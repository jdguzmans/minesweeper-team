import React, { Component } from 'react'

class GameStats extends Component {
  renderPlayerScores () {
    return this.props.players.map(player => {
      return (
        <div className='row'>
          <div className='col-sm-offset-1 col-sm-10'>
            <div className='col-sm-4'>
              <p style={{color: player.color}}>{player.username} </p>
            </div>
            <div className='col-sm-4'>
              <p> {player.score}pts </p>
            </div>
            <div className='col-sm-4'>
              {player.lost ? <p style={{color: 'red'}}>Dead</p> : <p style={{color: 'green'}}>Alive</p>}
            </div>
          </div>
        </div>
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
