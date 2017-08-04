import React from 'react'
import { registerComponent } from 'meteor/vulcan:core'

const ContentView = () => (
  <h1>Content view</h1>
)

registerComponent('ContentView', ContentView)
