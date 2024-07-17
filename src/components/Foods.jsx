
import React, { useEffect, useState } from 'react'
import { authContex } from '../context/authContext';
import { useContext } from 'react';



function Foods() {
    const[food,setFood] = useState([]);
    const loggedUser = useContext(authContex)
    console.log("token",loggedUser.loggedUser.token)
    console.log("Food ",food)

    useEffect(()=>{

        fetch("http://localhost:5000/foods",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "authorization":`bearer ${loggedUser.loggedUser.token}`
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
           
            setFood(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

  return (
    <div className="food-container">
        <div className="food-parent">

            {
                food.map((item,i)=>{

                    return(
                        <div className="food-item" key={i+1} >
                            <p>{item.name}</p>
                            <p>Protine:{item.protine}g</p>

                        </div>
                    )

                })
            }

        </div>

    </div>
  )
}

export default Foods;