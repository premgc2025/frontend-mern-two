
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Track from './Track'

function Home() {
  const navigate = useNavigate()

  function refreshHandle(event){
    event.preventDefault()
    navigate(0)
  }
  return (
    <div className="home-container container"  >
    <div className="home-parent" onClick={refreshHandle}>
        <h1 className='home-title'>NUTRITION</h1>
        <h3 className='home-body'>RESULT FOR THE A HEALTHEIER LIFE</h3>

    </div>
    <Track/>
    </div>
  )
}

export default Home