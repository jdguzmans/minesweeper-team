import React, { Component } from 'react'
import GameMessage from './GameMessage'
import SendGameMessage from './SendGameMessage'

class GameChat extends Component {
  renderMessages () {
    return this.props.chat.map(message => {
      return (
        <div className='normalContainer'>
          <GameMessage key={message.date} message={message} />
        </div>
      )
    })
  }

  render () {
    return (
      <div className='container-fluid'>
        <h3 className='font'>GameChat</h3>
        {!this.props.showingGame &&
          <SendGameMessage sendMessage={this.props.sendMessage} />
        }
        <div className='normalContainer'>
          {this.props.chat.length === 0 ? 'There are not messages, yet.' : this.renderMessages()
        }
        </div>
      </div>
    )
  }
}

export default GameChat
