import React, { Component } from 'react'
import './style.css'
import { Components, Utils } from 'meteor/vulcan:core'

Utils.icons.bookmark = 'bookmark'

class Bookmarks extends Component {
  render () {
    return (
      <div className='bookmarks'>
        <div className='section bookmarks-title'>
          <div className='content'>
            <Components.Icon name='bookmark' /> <p>Bookmarked Patents</p>
          </div>
        </div>

        <div className='section bookmarks-filter'>
          <input type='text' placeholder='Filter bookmarks..' />
        </div>

        <div className='section bookmarks-list'>
          {/* {this.props.bookmarks.map(bookmark => (<div className='bookmark'>{bookmark._id}</div>))} */}
        </div>
      </div>
    )
  }
}

export default Bookmarks
