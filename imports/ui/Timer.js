import React, { Component } from 'react'

class Timer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: parseInt(((new Date()).getTime() - new Date(props.date).getTime()) / 1000)
    }
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({
        timer: this.state.timer + 1
      })
    }, 1000)
  }

  componentWillUnmount () {
    this.setState({})
  }

  render () {
    return (
      <div>
        <h2>Time: {this.state.timer}s</h2>
      </div>
    )
  }
}

export default Timer
