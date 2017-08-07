import React, { Component } from 'react'
import './style.css'

import { registerComponent, withCurrentUser, Components } from 'meteor/vulcan:core'
import withInvestigations from '../../ducks/investigations'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'

class Container extends Component {
  constructor () {
    super()

    this.ws = null
  }

  componentWillMount () {
    if (!this.props.currentUser) {
      this.props.router.push('/')
    } else if (!this.props.investigations.currentInvestigation.id) {
      this.props.router.push('/app/investigations')
    } else if (this.props.investigations.currentInvestigation.id) {
      this.props.router.push('/app/patent-search')
    }
  }

  componentWillUpdate (nextProps) {
    const newInvestigation = !this.props.investigations.currentInvestigation.id && nextProps.investigations.currentInvestigation.id
    const differentInvestigation = this.props.investigations.currentInvestigation.id !== nextProps.investigations.currentInvestigation.id
    // const sameInvestigation = this.props.investigations.currentInvestigation.id && this.props.investigations.currentInvestigation.id === nextProps.investigations.currentInvestigation.id
    if (newInvestigation || differentInvestigation) {
      this.props.router.push('/app/patent-search')
      this.processCurrentInvestigation(nextProps.investigations.currentInvestigation)
    }
  }

  render () {
    return (
      <div className='app-body'>
        <Helmet>
          <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,900' rel='stylesheet' />
          <link href='https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css' rel='stylesheet' />
          <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' />
        </Helmet>

        <Components.Websocket
          url='ws://localhost:8088'
          onMessage={msg => this.onMessage(msg)}
          onOpen={msg => this.onOpen(msg)}
          ref={ws => this.bindWS(ws)}
        />

        <Components.Nav message={this.message} />
        <Components.ContentView message={this.message} >
          {this.props.children}
        </Components.ContentView>
      </div>
    )
  }

  bindWS (ws) {
    if (!this.ws && ws) {
      this.ws = ws.state.ws
    }
  }

  onOpen (msg) {
    console.log(msg)

    this.message({'mCommand': 'getAllUserInvestigationIds', 'mUserId': '1'},
      data => {
        // store investigations
        this.props.storeInvestigationData('allInvestigations', data)
      })
  }

  message = (msg, success, err) => {
    if (typeof msg === 'object') msg = JSON.stringify(msg)
    this.ws.send(msg)

    this.ws.onmessage = (msg) => {
      let data
      try {
        data = JSON.parse(msg.data)
      } catch (e) {
        data = msg.data
      }
      if (success) success(data)
    }

    this.ws.onerror = (err) => {
      if (err) error(err)
      else console.error(err)
    }
  }

  processCurrentInvestigation (investigation) {
    this.props.resetInvestigation()

    let bookmarkNodes = []

    const { bookmarks, nodes } = investigation

    nodes.forEach(node => {
      if (bookmarks.indexOf(node._id) > -1) bookmarkNodes.push(node)
    })

    this.props.storeInvestigationData('currentInvestigation', { ...investigation, bookmarkNodes })
  }
}

export default Container
registerComponent('Container', Container, withCurrentUser, withInvestigations, withRouter)
