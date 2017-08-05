import React from 'react'
import './style.css'
import { registerComponent } from 'meteor/vulcan:core'
import withInvestigations from '../../ducks/investigations'

const ContentView = (props) => {
  return (
    <div className='content'>
      {React.cloneElement(props.children, {
        investigations: props.investigations,
        storeInvestigationData: props.storeInvestigationData,
        message: props.message
      })}
    </div>
  )
}

export default ContentView
registerComponent('ContentView', ContentView, withInvestigations)
