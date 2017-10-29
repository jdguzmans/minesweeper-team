import React, { Component } from 'react'
import Message from './Message'
import SendMessage from './SendMessage'

class GameChat extends Component {
  renderMessages () {
    return this.props.chat.map(message => {
      return (
        <div className='normal-container'>
          <Message key={message.date} message={message} />
        </div>
      )
    })
  }

  render () {
    return (
      <div className='container-fluid'>
        <h2 className='primaryFont'>Chat</h2>
        {!this.props.showingGame &&
          <SendMessage sendMessage={this.props.sendMessage} />
        }
        <div className='normal-container'>
          {this.props.chat.length === 0 ? 'There are not messages, yet.' : this.renderMessages()
        }
        </div>
      </div>
    )
  }
}

export default GameChat
