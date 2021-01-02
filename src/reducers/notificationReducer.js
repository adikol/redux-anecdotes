
const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SHOW_MESSAGE':
            return action.message
        default:
            return state
    }
}

var timeOut = null

export const showMessage = (message, timeout) => {
    return async dispatch => {
        dispatch({
            type:'SHOW_MESSAGE',
            message,
        })

        message = ''

        clearTimeout(timeOut)
       
        timeOut = setTimeout(() => {
            dispatch({
                type:'SHOW_MESSAGE',
                message,
        })
        }, timeout)
}
}

export default notificationReducer