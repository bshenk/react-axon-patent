import React from 'react'
import './style.css'
import { registerComponent, Components } from 'meteor/vulcan:core'

import Search from './Search/'
import SelectedNode from './SelectedNode/'

const PatentSearch = (props) => {
  return (
    <div className='search-view'>
      <Components.Search
        message={props.message}
      />
      <Components.SelectedNode />
    </div>
  )
}

export default PatentSearch
registerComponent('PatentSearch', PatentSearch)
