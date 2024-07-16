
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import Register from './components/Register'

function App() {

  return (
    <>
      <h1>This is React Page</h1>

      <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />


      </Routes>      
      
      </BrowserRouter>
    </>
  )
}

export default App
