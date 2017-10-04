import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import GameList from './GameList'
import Map from './Map'

class App extends Component {
  render () {
    return (
      <div className='row'>
        <h1>HOLA</h1>
        <div className='col-sm-4'>
          <GameList games={[]} />
        </div>
        <div className='col-sm-8'>
          <h3>TABLERO</h3>
          <Map map={[['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']]} />
        </div>
      </div>
    )
  }
}

App.propTypes = {
}

export default createContainer(() => {
  return {
    hola: 'hola',
    games: []
  }
}, App)
