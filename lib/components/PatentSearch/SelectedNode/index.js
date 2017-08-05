import React from 'react'
import { registerComponent } from 'meteor/vulcan:core'

const SelectedNode = () => {
  return (
    <h1>Selected Node</h1>
  )
}

export default SelectedNode
registerComponent('SelectedNode', SelectedNode)
