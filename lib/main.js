import { addRoute } from 'meteor/vulcan:core'
import Container from './components/App/'

addRoute({ name: 'app', path: '/', componentName: 'Container' })
