import React, {Component} from 'react'

class Square extends Component {
  render () {
    return (
      <button
        className='square'
        disabled={this.props.isSelected}
        onClick={this.props.selectSquare}>
        {this.props.square.isSelected ? this.props.square.value : '?'}
      </button>
    )
  }
}

export default Square
