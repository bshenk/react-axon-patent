import React, { Component } from 'react'
import './style.css'
import { registerComponent } from 'meteor/vulcan:core'
import withInvestigations from '../../../ducks/investigations'

class SelectedNode extends Component {
  render () {
    const node = this.props.investigations.currentInvestigation.selectedNode
    if (node) {
      return (
        <div className='citation-text'>
          <div className='citation-header'>
            <h3><a href={node.AttributeValueMap.UrlString} target='_blank'>{node.AttributeValueMap.Title}</a></h3>
            <h5>{node.AttributeValueMap.Number}</h5>
            <span className='patent-buttons'>
              <i className='fa fa-bookmark icon-actions left-col' />
              <i className='fa fa-expand icon-actions left-col' />
              <i className='fa fa-trash icon-actions left-col' />
              <a href={node.AttributeValueMap.UrlString} target='_blank'><i className='fa fa-google icon-actions left-col' /></a>
              <button className='btn btn-primary full-view landscape-button'>Landscape View</button>
            </span>
          </div>

          <div className='citation-info'>
            <div className='classification'>
              <p className='bold'>Published:
                  <span className='right-col non-bold'>{node.AttributeValueMap.PublicationDate}</span>
              </p>
            </div>
            <div className='classification'>
              <p className='bold'>Status:
                  <span className='right-col non-bold'>{node.AttributeValueMap.PatentStatus}</span>
              </p>
            </div>
            <div className='classification'>
              <p className='bold'>Cooperative Classifications:
                  <span className='right-col non-bold'>{node.AttributeValueMap.CooperativeClassifications.join(', ')}</span>
              </p>
            </div>
            <div className='classification'>
              <p className='bold'>US Classifications:
                  <span className='right-col non-bold'>{node.AttributeValueMap.USClassifications.join(', ')}</span>
              </p>
            </div>
            <div className='classification'>
              <p className='bold'>European Classifications:
                  <span className='right-col non-bold'>{node.AttributeValueMap.EuropeanClassifications.join(', ')}</span>
              </p>
            </div>
            <div className='classification'>
              <p className='bold'>International Classifications:
                  <span className='right-col non-bold'>{node.AttributeValueMap.InternationalClassifications.join(', ')}</span>
              </p>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default SelectedNode
registerComponent('SelectedNode', SelectedNode, withInvestigations)
