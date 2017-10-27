import React, {Component} from 'react'

class Square extends Component {
  render () {
    return (
      <button
        className={this.props.square.isSelected ? 'cellNumber' + this.props.square.value : 'square'}
        disabled={this.props.square.isSelected}
        onClick={this.props.selectSquare}
        style={{backgroundColor: this.props.square.color}}
        >
        {this.props.square.isSelected ? this.props.square.value : '?'}
      </button>
    )
  }
}

export default Square
