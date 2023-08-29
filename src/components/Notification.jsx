const Notification = ({ message, notification }) => {

  if ((message === null) && (notification === null)) {
    return null
  } 
  else if ((message !== null) && (notification === null)) {
    return (
      <div className="error">
        {message}
      </div>
    )
  } else if ((notification !== null) && (message === null)) {
    return (
      <div className="notification">
        {notification}
      </div>
    )
  }
}
  
  export default Notification