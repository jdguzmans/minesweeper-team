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
          <h5 style={{color: this.props.message.color}} className='font'>{this.props.message.username}</h5>
        </div>
        <div className='col-sm-6'>
          <h6 className='font'>{this.props.message.text}</h6>
        </div>
        <div className='col-sm-3'>
          <h5 className='font'>{this.shownDate}</h5>
        </div>
      </div>
    )
  }
}

export default GameMessage
