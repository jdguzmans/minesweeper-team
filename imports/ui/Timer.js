import React, { Component } from 'react'

class Timer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: props.finished ? parseInt(((new Date(props.finishedAt)).getTime() - (new Date(props.date)).getTime()) / 1000) : parseInt(((new Date()).getTime() - new Date(props.date).getTime()) / 1000)
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      timer: nextProps.finished ? parseInt(((new Date(nextProps.finishedAt)).getTime() - (new Date(nextProps.date)).getTime()) / 1000) : parseInt(((new Date()).getTime() - new Date(nextProps.date).getTime()) / 1000)
    })
  }

  componentDidMount () {
    setInterval(() => {
      if (!this.props.finished) {
        this.setState({
          timer: this.state.timer + 1
        })
      }
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
