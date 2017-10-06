import React, { Component } from 'react'

class GameMessage extends Component {
  render () {
    return (
      <div className='col-sm-12'>
        <div className='col-sm-4'>
          <h5>{this.props.message.date}</h5>
        </div>
        <div className='col-sm-8'>
          <p>{this.props.message.text}</p>
        </div>
      </div>
    )
  }
}

export default GameMessage
