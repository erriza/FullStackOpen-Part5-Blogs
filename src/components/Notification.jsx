import { useNotificationValue } from "./createContext"

const Notification = () => {
  const notification = useNotificationValue()
  console.log(notification)

  if(!notification) {
    return null
  } else if (notification == 'Vote added' || notification == 'VOTE' ) {
    return (
      <div className="notification">
        {notification}
      </div>
    )
  } else if(notification == 'Error detected'){
    return (
      <div className="error">
        {notification}
      </div>
    )
  }
}

  // const style = {
  //   border: 'solid',
  //   padding: 10,
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  // if(!notification) {
  //   return null
  // } else {
  //   return (
  //   <div className="notification">
  //     {notification}
  //   </div>
  // )
  // }
// const Notification = ({ message, notification }) => {

//   if ((message === null) && (notification === null)) {
//     return null
//   } 
//   else if ((message !== null) && (notification === null)) {
//     return (
//       <div className="error">
//         {message}
//       </div>
//     )
//   } else if ((notification !== null) && (message === null)) {
//     return (
//       <div className="notification">
//         {notification}
//       </div>
//     )
//   }
// }
  
export default Notification