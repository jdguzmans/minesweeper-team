import React, { Component } from 'react'

class GameMessage extends Component {
  constructor (props) {
    super(props)
    let date = new Date(props.message.date)
    this.shownDate = ''
    this.shownDate = this.shownDate + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + (date.getDate() <= 9 ? '0' : '') +
    date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() <= 9 ? '0' : '') + date.getMinutes()
  }

  render () {
    return (
      <div className='row'>
        <div className='col-sm-3'>
          <h6 style={{color: this.props.message.color}} className='font'>{this.props.message.username}</h6>
        </div>
        <div className='col-sm-6'>
          <p>{this.props.message.text}</p>
        </div>
        <div className='col-sm-3'>
          <h6>{this.shownDate}</h6>
        </div>
      </div>
    )
  }
}

export default GameMessage
