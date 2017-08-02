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
    }
  }
})

addReducer({
  investigations: (state = {}, action) => {
    switch (action.type) {
      case 'STORE_DATA':
        return {
          ...state,
          [action.key]: action.data
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
