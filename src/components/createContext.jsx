import { createContext, useContext, useReducer } from "react";

export const ADD = 'ADD'
export const VOTE = 'VOTE'
export const REMOVE = 'REMOVE'
export const ERROR = 'ERROR'

const notificationReducer = (state, action) => {
    switch(action.type) {
        case ADD:
            return state = "New Notification added"
        
        case VOTE:
            return state = "Vote added"
        
        case ERROR:
            return state = "Error detected"
        
        case REMOVE:
            return null

        default:
            return state
    }       
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}


export default NotificationContext