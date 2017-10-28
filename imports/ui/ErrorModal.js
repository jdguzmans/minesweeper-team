import React, { Component } from 'react'

class ErrorModal extends Component {
  render () {
    if (!this.props.message) {
      return null
    }

    return (
      <div className='error-modal-container'>
        <div className='error-modal center-text'>
          <div>
            <h3>Error</h3>
          </div>
          <div>
            <p>{this.props.message}</p>
          </div>
          <div className='footer'>
            <button className='btn btn-default' onClick={this.props.onClose}>
              Got it
            </button>
          </div>
        </div>
      </div>

    )
  }
}

export default ErrorModal
