import React, { Component } from 'react'

class SendGameMessage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.sendMessage(this.state.message)
    this.setState({
      message: ''
    })
  }

  handleInputChange (e) {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  render () {
    return (
      <div className='normal-container'>
        <form className='form-horizontal' onSubmit={this.handleSubmit}>
          <div className='form-row'>
            <label className='control-label col-sm-2'>Send a message</label>
            <div className='col-sm-8'>
              <textarea aria-label="Write message here" name='message' type='text' className='form-control' rows='2' value={this.state.message} onChange={this.handleInputChange} placeholder='Write something' />
            </div>
            <div className='col-sm-2'>
              <button type='submit' className='btn btn-default'>Send</button>
            </div>
          </div>
        </form>

      </div>
    )
  }
}

export default SendGameMessage
