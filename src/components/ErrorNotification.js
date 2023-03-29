import React from 'react'


function ErrorNotification({message}) {

    if(message === null) {
        return null;
    }

  return (
    <div className='error'>
        {message}
    </div>
  )
}

export default ErrorNotification
