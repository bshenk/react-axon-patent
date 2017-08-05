import React, { Component } from 'react'
import './style.css'

import { registerComponent, Components, Utils } from 'meteor/vulcan:core'

Utils.icons.spinner = 'spinner fa-spin'

class Search extends Component {
  constructor () {
    super()

    this.state = {
      text: '',
      loading: false
    }

    this.input = null
  }

  componentDidMount () {
    if (this.input) this.input.focus()
  }

  render () {
    return (
      <div className='search list'>
        <div className='header'>
          <form onSubmit={e => this.sendSearch(e)}>
            {this.state.loading ? <Components.Icon name='spinner' /> : <Components.Icon name='search' />}
            <input
              type='text'
              placeholder='Search for patents..'
              value={this.state.text}
              onChange={e => this.onTextChange(e.target.value)}
              ref={c => (this.input = c)}
            />
          </form>
        </div>
        <div className='search-results'>
          <ul className='results-list'>
            {this.props.results.map(result => {
              return <li key={result._id}>
                <h3>{result.AttributeValueMap.Title}</h3>
                <p>{result._id}</p>
              </li>
            })}
          </ul>
        </div>
      </div>
    )
  }

  onTextChange (text) {
    this.setState({ text })
  }

  sendSearch (e) {
    e.preventDefault()

    this.setState({ loading: true })

    this.props.message({'mCommand': 'searchForPatents', mQuery: this.state.text, mInvestigationId: this.props.investigationId, mUserId: '1'}, data => {
      this.props.storeInvestigationData('searchResults', data)
      this.setState({ loading: false })
    })
  }
}

export default Search
registerComponent('Search', Search)
