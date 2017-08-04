import React, { Component } from 'react'
import { registerComponent } from 'meteor/vulcan:core'
import ReconnectingWebsocket from './ReconnectingWebsocket'
import PropTypes from 'prop-types'

class Websocket extends Component {
  constructor (props) {
      super(props)

      this.state = {
        ws: null
      }
    }

  componentWillUpdate (nextProps) {
      if (this.props.url !== nextProps.url) {
        if (this.state.ws) this.state.ws.close()
        this.setupWebsocket(nextProps.url)
      }
    }

  setupWebsocket (url) {
      let websocket = new ReconnectingWebsocket(url)

      websocket.onopen = () => {
        this.props.onOpen(`[WS] Connected to Websocket server: ${url}`)
      }

      websocket.onmessage = (evt) => {
        this.props.onMessage(evt.data)
      }

      websocket.onclose = () => {
        this.props.onClose(`[WS] Disconnected from Websocket server: ${url}`)
      }

      this.setState({ ws: websocket })
    }

  componentDidMount () {
      this.setupWebsocket(this.props.url)
    }

  componentWillUnmount () {
      this.state.ws.close()
    }

  render () {
      return (
        <div />
      )
    }
}

Websocket.propTypes = {
  url: PropTypes.string.isRequired,
  onMessage: PropTypes.func.isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  protocol: PropTypes.string
}

registerComponent('Websocket', Websocket)
