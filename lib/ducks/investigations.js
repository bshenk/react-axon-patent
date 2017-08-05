import { addAction, addReducer } from 'meteor/vulcan:core'
import { getActions } from 'meteor/vulcan:lib'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

addAction({
  investigations: {
    storeInvestigationData (key, data) {
      return {
        type: 'STORE_DATA',
        data,
        key
      }
    },
    resetInvestigation () {
      return { type: 'RESET_INVESTIGATION' }
    },
    selectNode (node) {
      return { type: 'SELECT_NODE', node }
    }
  }
})
const initialState = {
  currentInvestigation: {},
  allInvestigations: [],
  searchResults: []
}

addReducer({
  investigations: (state = initialState, action) => {
    switch (action.type) {
      case 'STORE_DATA':
        return {
          ...state,
          [action.key]: action.data
        }
      case 'RESET_INVESTIGATION':
        return {
          ...state,
          currentInvestigation: {}
        }
      case 'SELECT_NODE':
        return {
          ...state,
          currentInvestigation: {
            ...state.currentInvestigation,
            selectedNode: action.node
          }
        }
      default:
        return state
    }
  }
})

const mapStateToProps = state => ({ investigations: state.investigations })
const mapDispatchToProps = dispatch => bindActionCreators(getActions().investigations, dispatch)
const withInvestigations = component => connect(mapStateToProps, mapDispatchToProps)(component)

export default withInvestigations
