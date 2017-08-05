import { addRoute, getDynamicComponent } from 'meteor/vulcan:core'

import Container from './components/App/'
import Nav from './components/Nav/'
import ActionsBar from './components/Nav/ActionsBar/'
import Bookmarks from './components/Nav/Bookmarks/'
import UserInfo from './components/Nav/UserInfo/'
import ContentView from './components/ContentView/'
import Websocket from './components/Websocket/'
import LoginScreen from './components/LoginScreen/'
import InvestigationsList from './components/InvestigationsList/'
import PatentSearch from './components/PatentSearch'

addRoute({ name: 'login', path: '/', componentName: 'LoginScreen' })
addRoute({ name: 'app', path: '/app', componentName: 'Container' })
addRoute({
  name: 'investigations',
  path: '/app/investigations',
  component: InvestigationsList
}, 'app')
addRoute({
  name: 'patent-search',
  path: '/app/patent-search',
  component: PatentSearch
}, 'app')

// addRoute({
//   name: 'login',
//   path: '/login',
//   componentName: 'LoginScreen'
// })
