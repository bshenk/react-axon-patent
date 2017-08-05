import React, { Component } from 'react'
import './style.css'

import { Components, Utils, registerComponent } from 'meteor/vulcan:core'
import { withRouter } from 'react-router'

Utils.icons.open = 'folder-open'
Utils.icons.contact = 'envelope'
Utils.icons.extract = 'file-text'
Utils.icons.logout = 'sign-out'

class ActionsBar extends Component {
  render () {
    return (
      <div className='section actions-bar'>
        <div className='actions'>
          <Components.Icon name='plus' onClick={() => console.log('test')} />
          <Components.Icon name='open' onClick={() => this.props.router.push('/app/investigations')} />
          <Components.Icon name='contact' />
          <Components.Icon name='extract' />
          <Components.Icon name='logout' onClick={() => this.props.router.push('/')} />
        </div>
      </div>
    )
  }
}

export default ActionsBar
registerComponent('ActionsBar', ActionsBar, withRouter)
