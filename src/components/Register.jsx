import React, { useState } from 'react'

function Register() {

    const [user, setuser] = useState({
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

        setuser((preValue) => {
            return (
                { ...preValue, [event.target.name]: event.target.value }
            )
        })
    }

    // Submit form function
    function submitHandle(event) {
        event.preventDefault();

        fetch('http://localhost:5000/register', {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then((response) => {
                console.log(response)

                if (response.status === 200) {
                    setMessage({
                        type: "visible",
                        text: "Create user Successful"
                    })
                }
              
                    return response.json();
               

               

            })
            .then((data)=>{
              
                if(data.code===11000)
                    {
                        setMessage({
                            type: "visible",
                            text: data.errorResponse.errmsg
                        })
                    }
             
                  

                
            })

            .catch((err) => {
                setMessage({
                    type:"visible",
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

                <button className='form-btn'>Submit</button>

                <p className={message.type} >{message.text}</p>


            </form>
        </div>
    )
}

export default Register