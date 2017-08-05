import React, { Component } from 'react'
import './style.css'

import { registerComponent } from 'meteor/vulcan:core'

class InvestigationsList extends Component {
  render () {
    return (
      <div className='list'>
        <div className='header'><h5>Open Previous Investigation</h5></div>
        <ul className='results-list'>
          {this.props.investigations.allInvestigations
            ? this.props.investigations.allInvestigations.map(investigation => {
              const id = Object.keys(investigation)[0]
              const title = investigation[id]
              return <li key={id} onClick={() => this.openInvestigation(id, title)}>
                <h3>{title}</h3>
                <p>{id}</p>
              </li>
            })
            : null
          }
        </ul>
      </div>
    )
  }

  openInvestigation (id, title) {
    this.props.message({ mCommand: 'openInvestigation', mUserId: '1', mInvestigationId: id }, data => {
      this.props.storeInvestigationData('currentInvestigation', { ...data, name: title, id })
    })
  }
}

export default InvestigationsList
registerComponent('InvestigationsList', InvestigationsList)
