import React, { Component } from 'react'

class Instructions extends Component {
  render () {
    return (
      <div>
        <h1>Instructions</h1>

        <h3> Welcome to MineSweeper Team </h3>
        <h4> You will compete with your friends to get the most points possible within the same MineSweeper board </h4>
        <br />
        <br />

        <ul>
        
        <li><h4> To start, create an account or log in</h4></li>
        <li><h4> Next, create a game lobby and invite your friends to it.</h4></li>
        <li><h4> Try to get as many points as possible without hitting a mine. Once you do, you wont be able to play anymore</h4></li>
        </ul>
       
      </div>
    )
  }
}

export default Instructions
