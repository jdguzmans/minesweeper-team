import React, { Component } from 'react'
import Game from './Game'

class GameList extends Component {
  renderGames () {
    return this.props.games.map(game => {
      return (<Game key={game.id} game={game} goToGame={this.props.goToGame} />)
    })
  }

  render () {
    return (
      <div className='dark-container'>
        <h3>GameList</h3>
        <div>
          {this.renderGames()}
        </div>
      </div>
    )
  }
}

export default GameList
