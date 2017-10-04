import React, { Component } from 'react'
import Square from './Square'

class Map extends Component {
  renderRow (row) {
    return row.map(value => {
      return (<Square value={value} />)
    })
  }

  render () {
    return this.props.map.map(col => {
      return (
        <div className='row'>
          {this.renderRow(col)}
        </div>
      )
    })
  }
}

export default Map
