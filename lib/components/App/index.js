import React, { Component } from 'react'
import { registerComponent, withCurrentUser } from 'meteor/vulcan:core'
import withInvestigations from '../../ducks/investigations'
import './style.css'
import Nav from '../Nav/'
import ContentView from '../ContentView/'
import Websocket from '../Websocket/'
import Helmet from 'react-helmet'

class App extends Component {
  constructor () {
    super()

    this.state = {
      ws: null
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

        <Websocket
          url='ws://localhost:8088'
          onMessage={msg => this.onMessage(msg)}
          onOpen={msg => this.onOpen(msg)}
          ref={ws => this.bindWS(ws)}
        />

        <Nav message={this.message} />
        <ContentView children={this.props.children} message={this.message} />
      </div>
    )
  }

  bindWS (ws) {
    if (!this.state.ws && ws) {
      this.setState({ ws: ws.state.ws })
    }
  }

  onOpen (msg) {
    console.log(msg)

    this.message({'mCommand': 'getAllUserInvestigationIds', 'mUserId': '1'}, data => {
      // store investigations
      this.props.storeInvestigationData('allInvestigations', data)
    })
  }

  message (msg, success) {
    if (typeof msg === 'object') msg = JSON.stringify(msg)
    this.state.ws.send(msg)

    this.state.ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data)
      success(data)
    }
  }
}

export default App
registerComponent('App', App, withCurrentUser, withInvestigations)
