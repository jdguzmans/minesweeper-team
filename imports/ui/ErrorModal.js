import React, { Component } from 'react'

class ErrorModal extends Component {
  render () {
    if (!this.props.message) {
      return null
    }

    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    }

    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    }

    return (
      <div className='backdrop' style={backdropStyle}>
        <div style={modalStyle}>
          {this.props.message}
          <div className='footer'>
            <button onClick={this.props.onClose}>
            Got it
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ErrorModal
