import React, { Component } from 'react'
import './style.css'
import { Components, Utils, registerComponent } from 'meteor/vulcan:core'

Utils.icons.bookmark = 'bookmark'

class Bookmarks extends Component {
  render () {
    return (
      <div className='section bookmarks'>
        <div className='section bookmarks-title'>
          <div className='content'>
            <Components.Icon name='bookmark' /> <p>Bookmarked Patents</p>
          </div>
        </div>

        <div className='section bookmarks-filter'>
          <input type='text' placeholder='Filter bookmarks..' />
        </div>

        <div
          className='bookmarks-list'
          style={{ justifyContent: (this.props.bookmarks && this.props.bookmarks.length > 0) ? 'flex-start' : 'center' }}
        >
          {this.props.bookmarks && this.props.bookmarks.length > 0
            ? this.props.bookmarks.map(bookmark => {
              return (
                <div
                  className={this.props.selected && this.props.selected._id === bookmark._id ? 'bookmark selected' : 'bookmark'}
                  key={bookmark._id}
                  onClick={() => this.props.selectNode(bookmark)}
                >
                  <span className='id'>{bookmark._id}</span>
                  {bookmark.AttributeValueMap.Title}
                </div>
              )
            })
            : (this.props.investigationId
              ? <div className='no-bookmarks'>Your bookmarks will appear here.</div>
              : <div className='no-bookmarks'>Start or open an investigation.</div>)
          }
        </div>
      </div>
    )
  }
}

export default Bookmarks
registerComponent('Bookmarks', Bookmarks)
