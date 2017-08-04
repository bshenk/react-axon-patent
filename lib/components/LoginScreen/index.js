import React, { Component } from 'react'
import './style.css'

import { registerComponent, Components, withCurrentUser } from 'meteor/vulcan:core'

class LoginScreen extends Component {
  render () {
    return (
      <div className='login-screen' style={{ marginTop: this.props.hidden ? '-100vh' : '0'}}>
        <h1><span className='bold'>AXON</span>PATENT</h1>
        <Components.AccountsLoginForm ref={c => (this.loginForm = c)} />
        {this.props.currentUser ? <a onClick={() => this.hide()} className='back-to-app'>Back to App</a> : null}
      </div>
    )
  }
}

registerComponent('LoginScreen', LoginScreen, withCurrentUser)
