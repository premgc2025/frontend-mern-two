import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { authContex } from '../context/authContext'
import { useContext } from 'react'

function Login() {
 
    
    const [user, setUser] = useState({     
      email: "",
      password: "",   
  })


  const [message, setMessage] = useState({
      type: "invisible",
      text: ""
  })

  const navigate = useNavigate();

  const loggedUser = useContext(authContex)
 


  // Input Handle Function
  function inputHandle(event) {

      setUser((preValue) => {
          return (
              { ...preValue, [event.target.name]: event.target.value }
          )
      })
  }

  // Submit form function
  function submitHandle(event) {
      event.preventDefault();

      fetch('http://localhost:5000/login', {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
              "Content-Type": "application/json"
          }
      })
          .then((response) =>{
            console.log("response",response)
            if(response.status===404){
              setMessage({
                type: "error",
                text: "Email not Found"
            })}


            else if(response.status===401){
              setMessage({
                type: "error",
                text: "Wrong Password"
            })
            }
            else if(response.status===200){
              setMessage({
                type: "visible",
                text: "Login successful"
            })
            }
        
            

            return response.json()

          })
          .then((data) => {
            console.log("data",data, data.token)              

              setTimeout(() => {
                  setMessage({})
              }, 5000);

              if(data.token!==undefined)
              {
                localStorage.setItem("nutrify",JSON.stringify(data))
                loggedUser.setLoggedUser(data)
                navigate('/header')
           

              }
              
          })

          .catch((err) => {
              setMessage({
                  type: "err",
                  text: err
              })
              console.log(err)
          })

              
  }


  return (
      <div className="form-container">
          <form action="" className='form-parent' onSubmit={submitHandle}>
              <div className="form-title">
                  <h2 className='signin'>Sign in</h2>
                  <h4 className='form-signin-h4'>to continue to fitness</h4>
              </div>
             
              <div className="inp-div">
                  <label htmlFor="email">Email</label>
                  <input className='inp' type="email" name="email" id="email" required placeholder='Enter Your Email' onChange={inputHandle} defaultValue={user.email} />
              </div>
              <div className="inp-div">
                  <label htmlFor="password">Password</label>
                  <input className='inp' type="password" name="password" id="password" required placeholder='Enter Your Password' onChange={inputHandle} defaultValue={user.password} />
              </div>


              <button className='form-btn' type='submit'>Submit</button>
              <p className='form-note'>No account? <Link to='/register'>Create one!</Link> </p>

              <p className={message.type} >{message.text}</p>

              


          </form>
      </div>
  )
  
}

export default Login