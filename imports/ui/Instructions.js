import React, { Component } from 'react'

class Instructions extends Component {
  render () {
    return (
      <div>
        <h1 className='font'>Instructions</h1>

        <h3 className='font'> Welcome to MineSweeper Team </h3>
        <h4 className='font'> You will compete with your friends to get the most points possible within the same MineSweeper board </h4>
        <br />
        <br />

        <ul>
        
        <li><h4 className='font'> To start, create an account or log in</h4></li>
        <li><h4 className='font'> Next, create a game lobby and invite your friends to it.</h4></li>
        <li><h4 className='font'> Try to get as many points as possible without hitting a mine. Once you do, you wont be able to play anymore</h4></li>
        </ul>
       
      </div>
    )
  }
}

export default Instructions
