import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import axios from 'axios'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
axios.defaults.baseURL = `http://localhost:3001`


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: ""
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs ),
    )
    //to reload page after creating new blog
  }, [blog])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //Add New Blog
  const addBlog = ( blogObject ) => {
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlog(blogs.concat(returnedBlog))
        setNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} has been added`)
        setErrorMessage(null)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }).catch((error) => {
        setErrorMessage('there was an error, title may be missing? ')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  //Add likes to blogs
  const handleLikeBlog = ( blogObject ) => {
    let blogId = blogObject.id
    delete blogObject.id
    blogService.like(blogObject, blogId)
      .then(returnedBlog => {
        setBlog(blogs.concat(returnedBlog))
        setNotification(`You liked this blog: "${returnedBlog.title}" has now ${returnedBlog.likes} likes`)
        setErrorMessage(null)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }).catch((error) => {
        setErrorMessage('there was an error')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  //Remove Blogs
  const handleRemoveBlog = ( blogObject ) => {
    let title = blogObject.title
    let blogId = blogObject.id
    let blogAuthor = blogObject.author
    blogService.deleteBlog(blogId)
      .then(() => {
        console.log(title, blogId, blogAuthor);
        window.confirm(`Remove blog ${title} by ${blogAuthor}`)
        setNotification(`blog ${title} was deleted`)
        setBlog(blogs)
        setErrorMessage(null)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }).catch((error) => {
        setErrorMessage('Blogs can only be deleted by the user who creates them')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  //Handle Login for User
  const handleLogin = async(event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setNotification(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //Handle Logout from app
  const logout = () => {
    localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" closeLabel="cancel">
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

    if (user === null) {
      return (
        <div>
        <Notification message={errorMessage} notification={notification}/>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              username <br/>
              <input
                id='username-login' 
                type="text"
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
              />
              </div>
            <div>
              password <br/>
              <input
                id='password-login' 
                type='password'
                value={password}
                name='password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button id='submit-login' type='submit'>login</button>
          </form>
        </div>
      )
    }
  
    return (
      <div>
        <h2>blogs</h2>
        <div>
          <Notification notification={notification} message={errorMessage}/>
          {user.name} logged in  <br/>
          <button onClickCapture={logout}>log out</button>
        </div>
        <br/>
        {blogs.sort((a, b) => a.likes > b.likes ? -1 : 1).map(blog =>
          <Blog
            userSession={user}
            key={blog.id} 
            blog={blog} 
            likes={blog.likes} 
            url={blog.url}
            user={blog.user}
            likeBlog={handleLikeBlog}
            removeBlog={handleRemoveBlog}
          />
        )}
        <br/>
        {blogForm()}
      </div>
    )
  }


export default App