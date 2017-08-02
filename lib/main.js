import { addRoute } from 'meteor/vulcan:core'
import App from './components/App/'

addRoute({ name: 'app', path: '/', component: App })
