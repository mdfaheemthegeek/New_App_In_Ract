import React from 'react'

const NewItem = (props) => {
 

    let { title, description, imageUrl, newsUrl, author, publishedAt, source } = props
    return (
      <div className="my-3" style={{ width: "18rem" }}>
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">""
            <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: "90%", zIndex: "1" }}>
              {source.name}
              <span className="visually-hidden">unread messages</span>
            </span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className='text-muted'>By {!author ? "Unknown" : author} on {new Date(publishedAt).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </div>
    )
}

export default NewItem