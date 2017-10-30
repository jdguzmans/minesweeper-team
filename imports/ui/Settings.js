/* global */

import React, { Component } from 'react'

class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rows: 10,
      cols: 15
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.newGame = this.newGame.bind(this)
  }

  newGame (e) {
    e.preventDefault()
    this.props.newGame(parseInt(this.state.rows), parseInt(this.state.cols))
  }

  handleInputChange (e) {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  renderGameInvites () {
    return this.props.invites.map((invite, i) => {
      return (
        <div className='normal-container' key={i}>
          {invite.gamePrettyId}
          <button
            key={invite.gameId + 'a'}
            onClick={() => this.props.acceptInvite(invite.gameId)}
            className='btn btn-default'>
            ✓
          </button>
          <button
            key={invite.gameId + 'd'}
            onClick={() => this.props.declineInvite(invite.gameId)}
            className='btn btn-danger'>
            X
          </button>
        </div>
      )
    })
  }

  renderCurrentGames () {
    return this.props.games.map((game, i) => {
      return (
        <div className='normal-container' key={i}>
          <button
            key={game._id}
            aria-label='Active game'
            onClick={() => this.props.selectGame(game._id)}
            className='btn btn-info'>
            {game.prettyId}
          </button>
        </div>
      )
    })
  }

  renderFinishedGames () {
    return this.props.finishedGames.map((game, i) => {
      return (
        <div className='normal-container' key={i}>
          <button
            key={game._id}
            aria-label='Active game'
            onClick={() => this.props.selectGame(game._id)}
            className='btn btn-warning'>
            {game.prettyId}
          </button>
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <div className='normal-container'>
          <h2 className='primaryFont'>New Game</h2>
          <form className='form-horizontal' onSubmit={this.newGame}>
            <div className='form-row'>
              <div className='col-sm-6'>
                <label htmlfor='rowsInput'>Rows</label>
              </div>
              <div className='col-sm-6'>
                <input type='number' min='5' max='15' step='1' name='rows' className='form-control' id='rowsInput' value={this.state.rows} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className='form-row'>
              <div className='col-sm-6'>
                <label htmlfor='colsInput'>Columns</label>
              </div>
              <div className='col-sm-6'>
                <input type='number' min='15' max='20' step='1' name='cols' className='form-control' id='colsInput' value={this.state.cols} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className='center-text'>
              <button
                type='submit'
                className='btn btn-success'>
                Create
            </button>
            </div>
          </form>
        </div>
        <div className='normal-container'>
          <h2 className='primaryFont'>Game Invites</h2>
          {this.renderGameInvites()}
        </div>
        <div className='normal-container'>
          <h2 className='primaryFont'>Current Games</h2>
          {this.renderCurrentGames()}
        </div>
        <div className='normal-container'>
          <h2 className='primaryFont'>Finished Games</h2>
          {this.renderFinishedGames()}
        </div>
      </div>
    )
  }
}

export default Settings
