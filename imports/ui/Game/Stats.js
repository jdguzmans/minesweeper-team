import React, { Component } from 'react'

class Stats extends Component {
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
            {player.lost ? <img height="30" width="30" alt="You lost" src="../../../icn_face_03.png" /> : <img height="30" width="30" alt="Still alive" src="../../icn_face_01.png" />}
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
            <h4>Total Score: {this.props.score}pts</h4>
          </div>
        </div>
        <div>
          {this.renderPlayerScores()}
        </div>
      </div>
    )
  }
}

export default Stats
