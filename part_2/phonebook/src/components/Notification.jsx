const Notification = ({ message, msgType }) => {
    if (message === null) {
      return null
    }
    console.log(message, msgType)
    return (
      <div className = {`notification ${msgType}`} >
        {message}
      </div>
    )
  }

export default Notification  