import React, {Component} from 'react'

class Square extends Component {
  render () {
    return (
      <button
        //className='square'
        className= {this.props.square.isSelected ? 'Cell__number' + this.props.square.value : 'square'}
        disabled={this.props.isSelected}
        onClick={this.props.selectSquare}>

        {this.props.square.isSelected ? this.props.square.value : '?'}
        
      </button>
    )
  }
}

export default Square
