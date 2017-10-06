import React, { Component } from 'react'

class GameMessage extends Component {
  constructor (props) {
    super(props)
    let date = new Date(props.message.date)
    this.shownDate = date.toString()
  }

  render () {
    return (
      <div className='col-sm-12'>
        <div className='col-sm-4'>
          <h5>{this.shownDate}</h5>
        </div>
        <div className='col-sm-8'>
          <p>{this.props.message.text}</p>
        </div>
      </div>
    )
  }
}

export default GameMessage
