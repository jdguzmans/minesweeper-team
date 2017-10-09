import React, { Component } from 'react'
import GameMessage from './GameMessage'
import SendGameMessage from './SendGameMessage'

class GameChat extends Component {
  renderMessages () {
    return this.props.chat.map(message => {
      return (<GameMessage key={message.date} message={message} />)
    })
  }

  render () {
    return (
      <div className='row'>
        <h3 className='font'>GameChat</h3>
        <div>
          <div className='col-sm-offset-2 col-sm-8'>
            <SendGameMessage sendMessage={this.props.sendMessage} />
          </div>
        </div>
        <div className='row col-sm-offset-1 col-sm-10'>
          {this.renderMessages()}
        </div>
      </div>
    )
  }
}

export default GameChat
