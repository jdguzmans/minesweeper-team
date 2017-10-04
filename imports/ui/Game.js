/* global */

import React, { Component } from 'react'

class Game extends Component {
  handleClick (e) {
    e.preventDefault()
    this.props.goToGame(this.props.game.id)
  }

  render () {
    return (
      <div className='col-sm-12 following'>
        <div className='col-sm-6'>
          <div className='row'>
            <a href='#l' onClick={this.handleClick.bind(this)}>
              <h4>{this.props.game.id}</h4>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Game
