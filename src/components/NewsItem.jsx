import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date} = this.props
    return (
        <div className='my-3'>
            <div className="card">
                <img src={imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className='text-muted'/>By {author} on {new Date(date).toGMTString()} </p>
                        <a href={newsUrl} target="_blank" className="btn btm-sm btn-primary">Read More</a>
                    </div>
            </div>
        </div>
    )
  }
}

export default NewsItem