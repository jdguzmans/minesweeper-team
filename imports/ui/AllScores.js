import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class AllScores extends Component {
  render () {
    const columns = [{
      Header: 'Username',
      columns: [{
        Header: '[ - ]',
        accessor: 'username'
      }]
    }, {
      Header: 'Games',
      columns: [{
        Header: '[ - ]',
        accessor: 'games.length'
      }]
    }, {
      Header: 'Score',
      columns: [{
        Header: '[ pts ]',
        accessor: 'scoreSum'
      }]
    }, {
      Header: 'Average',
      columns: [{
        Header: '[ pts/game ]',
        accessor: 'scoreAverage'
      }]
    }, {
      Header: 'Speed',
      columns: [{
        Header: '[ pts/s ]',
        accessor: 'speed'
      }]
    }]

    return (
      <div>
        <h2>Scores</h2>
        <ReactTable data={this.props.scores} columns={columns} defaultPageSize={10} showPageSizeOptions={false} className='table table-striped table-hover' />
      </div>
    )
  }
}

export default AllScores
