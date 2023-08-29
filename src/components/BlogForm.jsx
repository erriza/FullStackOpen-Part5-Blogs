import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url
        })
        setNewBlog('')
    }

    const handleBlogChange = (event) => {
        const { name, value } = event.target
        setNewBlog({
          ...newBlog,
          [name]: value,
        })
    }

    return (
        <div>
        <h2>Create new entry</h2>
        <form onSubmit={addBlog}>
            title: <br/>
            <input
              id="input-titleBlog"
              type='text'
              value={newBlog.title || ''}
              name='title'
              onChange={handleBlogChange}
            /> <br/>
            author: <br/>
            <input
              id="input-authorBlog"
              type='text'
              value={newBlog.author || ''}
              name='author'
              onChange={handleBlogChange}
            /> <br/>
            url: <br/>
            <input
              id="input-urlBlog"
              type='text'
              value={newBlog.url || ''}
              name='url'
              onChange={handleBlogChange}
            /> <br/>
            <button type='submit'>save</button>
          </form>
      </div>
    )
}

export default BlogForm