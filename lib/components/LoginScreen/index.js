import React, { Component } from 'react'
import './style.css'

import { registerComponent, Components, withCurrentUser } from 'meteor/vulcan:core'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'

class LoginScreen extends Component {
  // componentWillUpdate (nextProps) {
  //   if (nextProps.currentUser) this.props.router.push('/app')
  // }

  render () {
    return (
      <div className='login-screen' style={{ marginTop: this.props.hidden ? '-100vh' : '0'}}>
        <Helmet>
          <link href='https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css' rel='stylesheet' />
        </Helmet>

        <h1><span className='bold'>AXON</span>PATENT</h1>
        <Components.AccountsLoginForm ref={c => (this.loginForm = c)} />
        {this.props.currentUser ? <a onClick={() => this.props.router.push('/app')} className='back-to-app'>Back to App</a> : null}
      </div>
    )
  }
}

export default LoginScreen
registerComponent('LoginScreen', LoginScreen, withCurrentUser, withRouter)
