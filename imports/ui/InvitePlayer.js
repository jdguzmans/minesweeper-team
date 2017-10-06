import React, { Component } from 'react'

class InvitePlayer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      invitedPlayer: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.invitePlayer(this.props.gameId, this.state.invitedPlayer)
  }

  handleInputChange (e) {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  render () {
    return (
      <form className='form-horizontal' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label className='control-label col-sm-2'>Invite a Player</label>
          <div className='col-sm-8'>
            <input name='invitedPlayer' type='text' className='form-control' value={this.state.invitedPlayer} onChange={this.handleInputChange} placeholder='Enter username' />
          </div>
          <div className='col-sm-2'>
            <button type='submit' className='btn btn-default'>Invite</button>
          </div>
        </div>
      </form>
    )
  }
}

export default InvitePlayer
