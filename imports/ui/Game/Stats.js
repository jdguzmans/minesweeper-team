import React, { Component } from 'react'

class GameStats extends Component {
  renderPlayerScores () {
    return this.props.players.map(player => {
      return (
        <div className='row'>
          <div className='col-sm-4 text-center'>
            <h4 style={{color: player.color}}>{player.username} </h4>
          </div>
          <div className='col-sm-4 text-center'>
            <h4 className='font'> {player.score}pts </h4>
          </div>
          <div className='col-sm-4 text-center'>
            {player.lost ? <h4 style={{color: 'red'}} >Dead</h4> : <h4 style={{color: 'green'}}>Alive</h4>}
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='center-text'>
            <h2>Total Score: {this.props.score}pts</h2>
          </div>
        </div>
        <div>
          {this.renderPlayerScores()}
        </div>
      </div>
    )
  }
}

export default GameStats
