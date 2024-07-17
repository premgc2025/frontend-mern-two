import React from 'react'
import { authContex } from '../context/authContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

function Private(props) {
    const loggedUser = useContext(authContex)

  return (
    <div className="private-container">
    {
      loggedUser.loggedUser!==null ? <props.Component/>
        :<Navigate to='/login'/>
  }
  </div>
  )
}

export default Private;