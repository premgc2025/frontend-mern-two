import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { baseurl } from '../../helper'


function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        age: ""
    })

    const [message, setMessage] = useState({
        type: "invisible",
        text: ""
    })

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

        fetch(`${baseurl}/register`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setMessage({
                        type: "visible",
                        text: "Create user Successful"
                    })
                }

                return response.json();
            })
            .then((data) => {
                if (data.code === 11000) {
                    setMessage({
                        type: "error",
                        text: " This Email is already registered"
                    })
                }

                setTimeout(() => {
                    setMessage({})
                }, 5000);
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
                    <h3>Registration</h3>
                </div>
                <div className="inp-div">
                    <label htmlFor="name">Name</label>
                    <input className='inp' type="text" name="name" id="name" placeholder='Enter Your Name' required onChange={inputHandle} defaultValue={user.name} />
                </div>
                <div className="inp-div">
                    <label htmlFor="email">Email</label>
                    <input className='inp' type="email" name="email" id="email" required placeholder='Enter Your Email' onChange={inputHandle} defaultValue={user.email} />
                </div>
                <div className="inp-div">
                    <label htmlFor="password">Password</label>
                    <input className='inp' type="password" name="password" id="password" required placeholder='Enter Your Password' onChange={inputHandle} defaultValue={user.password} />
                </div>

                <div className="inp-div">
                    <label htmlFor="age">Age</label>
                    <input className='inp' type="number" name="age" id="age" max={100} required placeholder='Enter Your Password' onChange={inputHandle} defaultValue={user.age} />
                </div>

                <button className='form-btn' type='submit'>Submit</button>
                <p className='form-note'>Already have an account? <Link to='/login' >Login</Link> </p>

                <p className={message.type} >{message.text}</p>
            </form>
        </div>
    )
}

export default Register