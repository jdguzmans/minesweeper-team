
import React, {Component} from 'react'
import { Meteor } from 'meteor/meteor'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    let a = Meteor.call('users.login', {email: this.state.user, password: this.state.password})
    console.log(a)
  }

  handleInputChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render () {
    return (
      <div>
        <h1>Come on in!</h1>
        <form className='form-horizontal' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label className='control-label col-sm-2'>Email</label>
            <div className='col-sm-10'>
              <input name='email' type='email' className='form-control' value={this.state.email} onChange={this.handleInputChange} placeholder='Enter email' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2'>Password</label>
            <div className='col-sm-10'>
              <input name='password' type='password' className='form-control' value={this.state.password} onChange={this.handleInputChange} placeholder='Enter password' />
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button type='submit' className='btn btn-default'>Login</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
