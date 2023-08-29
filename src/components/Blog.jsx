import Togglable from "./Togglable"

const Blog = ({ blog, likeBlog, removeBlog, userSession }) => {

  const handleLike = () => {
    likeBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      id: blog.id
    })
  }

  const handleRemove = () => {
    removeBlog({
      title: blog.title,
      author: blog.author,
      id: blog.id
    })
  }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blog" style={blogStyle}>
      <div className="blog-title">
        {blog.title}
      </div>
      <Togglable buttonLabel="view more" closeLabel="hide">
        <div>
          {blog.url}
        </div>
        <div>
          likes: {blog.likes} <button id="like-button" onClick={handleLike} >like</button>
        </div>
        <div>
          Author: {blog.author}
        </div>
        <div>
          added by: {blog.user.name}
        </div>
        { blog.user.username == userSession.username ? <button onClick={handleRemove}>Remove blog</button> : null }
      </Togglable>
    </div>  
  )}

export default Blog