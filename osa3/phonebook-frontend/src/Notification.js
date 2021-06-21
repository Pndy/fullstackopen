
const Notification = ({message}) => {
    if(message===null || message===''){
        return null
    }
    
    return (
        <div className={message.type}>
            {message.text}
        </div>
    )
}

export default Notification