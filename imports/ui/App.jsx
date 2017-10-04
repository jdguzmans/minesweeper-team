import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import Game from './Game'
import Logic from './../logic'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // gameMap: this.props.gameMap
      game: {
        gameMap: Logic.createGameMap(10, 11),
        startedAt: new Date(),
        score: 0
      }
    }
  }

  selectSquare (i, j) {
    let newMap = Logic.selectedSquare(i, j, this.state.game.gameMap)
    let score = newMap.map(row => {
      return row.filter(x => {
        return x.isSelected && x.value !== -1
      }).length
    }).reduce((total, x) => {
      return total + x
    })
    this.setState({
      gameMap: newMap,
      score: score
    })
  }

  render () {
    return (
      <div className='row'>
        <div className='col-sm-4'>
          <h1>HOLA</h1>
        </div>
        <div className='col-sm-8'>
          <h3>GAME</h3>
          <Game game={this.state.game} score={this.state.score} selectSquare={this.selectSquare.bind(this)} />
        </div>
      </div>
    )
  }
}

App.propTypes = {
}

export default createContainer(() => {
  return {
    games: [],
    gameMap: [[{value: '.', isSelected: true}, {value: '.', isSelected: false}, {value: '.', isSelected: false}],
          [{value: '.', isSelected: false}, {value: '.', isSelected: false}, {value: '.', isSelected: false}],
          [{value: '.', isSelected: false}, {value: '*', isSelected: false}, {value: '.', isSelected: false}]]
  }
}, App)
