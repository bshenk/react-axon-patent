import React, { Component } from 'react'
import './style.css'

import { registerComponent, Components, Utils } from 'meteor/vulcan:core'
import withInvestigations from '../../../ducks/investigations'

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
            {this.props.investigations.searchResults.map(result => {
              let abstract = result.AttributeValueMap.Abstract
              if (abstract && abstract.length > 200) {
                abstract = `${abstract.substring(0, 200)}... Click to read more.`
              } else if (!abstract) {
                abstract = 'No abstract available. Click to view full text.'
              }

              return <li key={result._id} onClick={() => this.props.selectNode(result)} className={this.isSelected(result._id) ? 'selected' : ''}>
                <div className='result-header'>
                  <div className={this.isBookmark(result._id) ? 'bookmark-icon bookmarked' : 'bookmark-icon'}>
                    <Components.Icon name='bookmark' onClick={() => this.bookmarkNode(result)} />
                  </div>
                  <div className='info'>
                    <h3>{result.AttributeValueMap.Title}</h3>
                    <p className='id'>{result.AttributeValueMap.PatentStatus} {result._id}</p>
                    <p className='bullet-before'>Published on {result.AttributeValueMap.PublicationDate}</p>
                  </div>
                </div>
                <p className='abstract'>{abstract}</p>
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

    this.props.message({'mCommand': 'searchForPatents', mQuery: this.state.text, mInvestigationId: this.props.investigations.currentInvestigation.id, mUserId: '1'}, data => {
      this.props.storeInvestigationData('searchResults', data)
      this.setState({ loading: false })
    })
  }

  isBookmark (nodeID) {
    return this.props.investigations.currentInvestigation.bookmarks.indexOf(nodeID) > -1
  }

  isSelected (nodeID) {
    if (this.props.investigations.currentInvestigation.selectedNode) {
      return this.props.investigations.currentInvestigation.selectedNode._id === nodeID
    } else {
      return false
    }
  }

  bookmarkNode (node) {
    // if not bookmark, bookmark it
    if (!this.isBookmark(node._id)) {
      this.props.bookmarkNode(node)
      this.props.message({
        'mCommand': 'bookmarkPatent',
        'mPatentId': node._id,
        'mInvestigationId': this.props.investigations.currentInvestigation.id,
        'mUserId': '1'
      })
    } else { // unbookmark if bookmarked
      this.props.unbookmarkNode(node)
      this.props.message({
        'mCommand': 'unbookmarkPatent',
        'mPatentId': node._id,
        'mInvestigationId': this.props.investigations.currentInvestigation.id,
        'mUserId': '1'
      })
    }
  }
}

export default Search
registerComponent('Search', Search, withInvestigations)
