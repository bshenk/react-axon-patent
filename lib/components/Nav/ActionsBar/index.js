import React, { Component } from 'react'
import { Components, Utils } from 'meteor/vulcan:core'
import './style.css'

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
          <Components.Icon name='open' />
          <Components.Icon name='contact' />
          <Components.Icon name='extract' />
          <Components.Icon name='logout' />
        </div>
      </div>
    )
  }
}

export default ActionsBar
