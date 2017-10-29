import React, {Component} from 'react'

class Square extends Component {

  render () {
    
    let numValue;
    if (this.props.square.value<0) {
      numValue = '_'
    } 

    return (
      <button
        className={this.props.square.selectedBy ? 'cell-number-' + this.props.square.value : 'square'}
        disabled={this.props.square.selectedBy}
        onClick={this.props.selectSquare}
        style={{backgroundColor: this.props.square.color}}
        >

        {this.props.square.selectedBy ? {numValue} : <img height="2.5em" width="2.5em" alt="Unopened square" src="../../icn_square.png" /> }
      </button>
    )
  }
}

export default Square
