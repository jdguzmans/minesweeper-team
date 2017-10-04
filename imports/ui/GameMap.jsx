import React, { Component } from 'react'
import Square from './Square'

class GameMap extends Component {
  renderRow (row, i) {
    return row.map((square, j) => {
      return (
        <Square
          square={square}
          selectSquare={() => this.props.selectSquare(i, j)} />)
    })
  }

  render () {
    return this.props.gameMap.map((row, i) => {
      return (
        <div className='row'>
          {this.renderRow(row, i)}
        </div>
      )
    })
  }
}

export default GameMap
