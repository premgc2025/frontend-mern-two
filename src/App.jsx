
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Track from './components/Track'
import { authContex } from './context/authContext'
import { useState } from 'react'
import Private from './components/Private'
import Header from './components/Header'
import Foods from './components/Foods'

function App() {

  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('nutrify')))

  console.log("app loggedData",loggedUser)



  return (
    <>
      <h1>This is React Page</h1>
    

      <authContex.Provider value={{loggedUser, setLoggedUser}} >

     

      <BrowserRouter>
      <Header/>
    
      <Routes>
  

        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/track' element={<Private Component={Track}/>} />
        {/* <Route path='/foods' element={<Private Component={Foods}/>} /> */}
        <Route path='/foods' element={<Foods/>} />
        


      </Routes>      
      
      </BrowserRouter>
      </authContex.Provider>
     
      
    </>
  )
}

export default App
