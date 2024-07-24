
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Track from './Track'
import { useContext } from 'react'
import { authContex } from '../context/authContext'

function Home() {
  const navigate = useNavigate()
  const loggedUser = useContext(authContex)

  function refreshHandle(event){
    event.preventDefault()
    navigate(0)
  }
  return (
    <div className="home-container container"  >
      {
        loggedUser.loggedUser!==null ? <p className='login-name'>{loggedUser.loggedUser.name}</p> :""
      }
      
    <div className="home-parent" onClick={refreshHandle}>
        <h1 className='home-title'>NUTRITION</h1>
        <h3 className='home-body'>RESULT FOR THE A HEALTHEIER LIFE</h3>
    </div>
    <Track/>
    </div>
  )
}

export default Home