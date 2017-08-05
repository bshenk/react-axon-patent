import React from 'react'
import { registerComponent } from 'meteor/vulcan:core'
import './style.css'

const UserInfo = () => (
  <div className='section user-info'>
    <img className='avatar' src='/packages/axon-patent/lib/assets/user-image.png' />
    <div className='info'>
      <h3>bshenk</h3>
      <p>ID: 1</p>
    </div>
  </div>
)

export default UserInfo
registerComponent('UserInfo', UserInfo)
