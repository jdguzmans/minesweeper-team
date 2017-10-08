import React, { Component } from 'react'

class GameStats extends Component {
  renderPlayerScores () {
    return this.props.players.map(player => {
      return (
        <div className='row'>
          <div className='col-sm-offset-1 col-sm-10'>
            <div className='col-sm-4'>
              <h4 style={{color: player.color}} className='font'>{player.username} </h4>
            </div>
            <div className='col-sm-4'>
              <h4 className='font'> {player.score}pts </h4>
            </div>
            <div className='col-sm-4'>
              {player.lost ? <h4 style={{color: 'red'}} >Dead</h4> : <h4 style={{color: 'green'}}>Alive</h4>}
            </div>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <h2 className='font'>Total Score: {this.props.score}pts</h2>
        {this.renderPlayerScores()}
      </div>
    )
  }
}

export default GameStats
