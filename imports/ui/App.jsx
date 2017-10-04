import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import GameList from './GameList'
import GameMap from './GameMap'
import Logic from './../logic'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // gameMap: this.props.gameMap
      gameMap: Logic.createGameMap(10, 11)
    }
  }

  selectSquare (i, j) {
    let newMap = this.state.gameMap
    newMap[i][j].isSelected = true
    this.setState({
      gameMap: newMap
    })
  }

  render () {
    return (
      <div className='row'>
        <h1>HOLA</h1>
        <div className='col-sm-4'>
          <GameList games={[]} />
        </div>
        <div className='col-sm-8'>
          <h3>TABLERO</h3>
          <GameMap gameMap={this.state.gameMap} selectSquare={this.selectSquare.bind(this)} />
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
