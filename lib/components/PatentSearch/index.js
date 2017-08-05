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
        storeInvestigationData={props.storeInvestigationData}
        investigationId={props.investigations.currentInvestigation.id}
        results={props.investigations.searchResults}
      />
      <Components.SelectedNode />
    </div>
  )
}

export default PatentSearch
registerComponent('PatentSearch', PatentSearch)
