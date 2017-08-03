import React, { Component } from 'react'
import './style.css'

import { registerComponent, Components, withCurrentUser } from 'meteor/vulcan:core'

class LoginScreen extends Component {
  constructor () {
    super()

    this.state = {
      hidden: false
    }
  }
  render () {
    return (
      <div className='login-screen' style={{ marginTop: this.state.hidden ? '-100vh' : '0'}}>
        <h1><span className='bold'>AXON</span>PATENT</h1>
        <Components.AccountsLoginForm ref={c => (this.loginForm = c)} />
        {this.props.currentUser ? <a onClick={() => this.hide()} className='back-to-app'>Back to App</a> : null}
      </div>
    )
  }

  hide () {
    this.setState({ hidden: true })
  }

  show () {
    this.setState({ hidden: false })
  }
}

registerComponent('LoginScreen', LoginScreen, withCurrentUser)
