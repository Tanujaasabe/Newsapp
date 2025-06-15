import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsurl,author,date,source  } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute', right:0}}>

          </div>
          <div className="container">
          <span className=" badge rounded-pill bg-danger">{source}
  </span>
  </div>
          <img
            src={  !imageurl  ? "https://s.hdnux.com/photos/01/50/51/47/27433460/3/rawImage.jpg" : imageurl }
            className="card-img-top"
            alt="news"
          />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small class="text-muted">By {!author?"Unknown":author} on { new Date(date).toGMTString()}</small></p>
            <a rel="noopener noreferrer" href={newsurl}target="_blank"className="btn btn-sm btn-dark"  > Read More </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
