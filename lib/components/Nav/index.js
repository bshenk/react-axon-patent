import React, { Component } from 'react'
import './style.css'

import { Components, Utils, registerComponent } from 'meteor/vulcan:core'
import withInvestigations from '../../ducks/investigations'

Utils.icons.landscape = 'bar-chart'
Utils.icons.recommend = 'cogs'

class Nav extends Component {
  render () {
    return (
      <div className='nav'>
        <div className='section logo'>
          <span className='bold'>AXON</span>PATENT
        </div>

        <Components.ActionsBar />

        <div className='section investigation-info'>
          <h5>INVESTIGATION</h5>
          <p>
            {this.props.investigations.currentInvestigation.name
              ? this.props.investigations.currentInvestigation.name
              : 'Start or open an investigation.'
            }
          </p>

        </div>

        <Components.Bookmarks
          bookmarks={this.props.investigations.currentInvestigation.bookmarkNodes}
          selectNode={this.props.selectNode}
          selected={this.props.investigations.currentInvestigation.selectedNode}
          investigationId={this.props.investigations.currentInvestigation.id}
        />

        <div className='section patent-search'>
          <p><Components.Icon name='search' /> Patent Search</p>
        </div>

        <div className='section patent-landscape'>
          <p><Components.Icon name='landscape' /> Patent Landscape</p>
        </div>

        <div className='section patent-recommendations' disabled>
          <p><Components.Icon name='recommend' /> Patent Recommendations</p>
        </div>

        <Components.UserInfo />

        <div className='copyright'>
          <p className='copyright'>© 2017 AxonAI, Inc. All rights reserved.</p>
        </div>
      </div>
    )
  }
}

export default Nav
registerComponent('Nav', Nav, withInvestigations)
