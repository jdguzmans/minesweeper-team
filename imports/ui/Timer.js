import React, { Component } from 'react'

class Timer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: (new Date()).getDate() - props.date.getDate()
    }
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({
        timer: this.state.timer + 1
      })
    }, 1000)
  }
  render () {
    return (
      <div>
        <h1>Time: {this.state.timer}s</h1>
      </div>
    )
  }
}

export default Timer
