import React, {Component} from 'react'

class Square extends Component {

  render () {
  
    return (
      <button
        className={this.props.square.selectedBy ? 'cell-number-' + this.props.square.value : 'square'}
        disabled={this.props.square.selectedBy}
        onClick={this.props.selectSquare}
        style={{backgroundColor: this.props.square.color}}
        >

        {this.props.square.selectedBy ? this.props.square.value : <img height="2.5em" width="2.5em" alt="Unopened square" src="../../icn_square.png" /> }
      </button>
    )
  }
}

export default Square
