import React, { Component } from 'react'
import './style.css'

import { Components, Utils, registerComponent } from 'meteor/vulcan:core'

import ActionsBar from './ActionsBar/'
import Bookmarks from './Bookmarks/'
import UserInfo from './UserInfo/'

Utils.icons.landscape = 'bar-chart'
Utils.icons.recommend = 'cogs'

class Nav extends Component {
  render () {
    return (
      <div className='nav'>
        <div className='section logo'>
          <span className='bold'>AXON</span>PATENT
        </div>

        <ActionsBar loginForm={this.props.loginForm} />

        <div className='section investigation-info'>
          <h5>INVESTIGATION</h5>
          <p>{this.props.investigationName ? this.props.investigationName : 'No investigation currently selected.'}</p>
        </div>

        <Bookmarks />

        <div className='section patent-search'>
          <p><Components.Icon name='search' /> Patent Search</p>
        </div>

        <div className='section patent-landscape'>
          <p><Components.Icon name='landscape' /> Patent Landscape</p>
        </div>

        <div className='section patent-recommendations'>
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

registerComponent('Nav', Nav)
