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
        <h3>GameChat</h3>
        <div>
          <div className='col-sm-offset-1 col-sm-10'>
            <SendGameMessage sendMessage={this.props.sendMessage} />
          </div>
        </div>
        <div className='row'>
          {this.renderMessages()}
        </div>
      </div>
    )
  }
}

export default GameChat
