import React, { Component } from 'react'

class Timer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: !props.startedAt ? 0 : !props.finishedAt ? parseInt(((new Date()).getTime() - props.startedAt.getTime()) / 1000) : parseInt((props.finishedAt.getTime() - props.startedAt.getTime()) / 1000)
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      timer: !nextProps.startedAt ? 0 : !nextProps.finishedAt ? parseInt(((new Date()).getTime() - nextProps.startedAt.getTime()) / 1000) : parseInt((nextProps.finishedAt.getTime() - nextProps.startedAt.getTime()) / 1000)
    })
  }

  componentDidMount () {
    setInterval(() => {
      if (this.props.startedAt && !this.props.finishedAt) {
        this.setState({
          timer: this.state.timer + 1
        })
      }
    }, 1000)
  }

  render () {
    return (
      <div>
        <h2 className='font'>Time: {this.state.timer}s</h2>
      </div>
    )
  }
}

export default Timer
